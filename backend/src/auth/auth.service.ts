import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRole } from 'src/users/enums/user-role.enum';
import { UserStatus } from 'src/users/enums/user-status.enum';


// Only numbers
function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(
    email: string,
    password: string,
    companyName: string,
    name: string,
    phone: string,
  ) {
    const normalizedPhone = normalizePhone(phone);
    const userExists = await this.userRepository.findOne({ where: { email } });
    if (userExists) throw new BadRequestException('User already exists.');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      role: UserRole.SELLER,
      status: UserStatus.PENDING,
      phone: normalizedPhone,
      companyName,
      company: companyName,
      name,
    });
    await this.userRepository.save(newUser);

    return { message: 'User registered successfully.' };
  }
    async validateUser(email: string, password: string) {

        const user = await this.userRepository
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', { email })
            .getOne();

        if (!user) { throw new UnauthorizedException('Invalid credentials.'); }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) { throw new UnauthorizedException('Invalid credentials.'); }

        return user;
    }

    login(user: User) {

        const payload = { sub: user.id, email: user.email, role: user.role, };
        return { access_token: this.jwtService.sign(payload) };
    }

}
