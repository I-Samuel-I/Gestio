import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRole } from 'src/users/enums/user-role.enum';
import { UserStatus } from 'src/users/enums/user-status.enum';
import { Company } from 'src/settings/entities/company.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
    ) {}

    async register(data:CreateUserDto) {

        const userExists = await this.userRepository.findOne({ where: { email: data.email} });

        if (userExists) throw new BadRequestException('Usuário já existe.');

        const normalizedCompany = data.company.trim().toUpperCase();

        if (!normalizedCompany) {
            throw new BadRequestException('Empresa é obrigatória.');
        }

        const companyUsersCount = await this.userRepository.count({ where: { company: normalizedCompany } });

        const hashedPassword = await bcrypt.hash(data.password, 10);

        if (companyUsersCount === 0) {
            await this.companyRepository.save({
                name: normalizedCompany,
                email: data.email,
                phone: data.phone,
            });
        }

        const newUser = this.userRepository.create({ 
            name: data.name,
            email: data.email, 
            password: hashedPassword, 
            phone: data.phone,  
            company: normalizedCompany,
            role: companyUsersCount === 0 ? UserRole.MANAGER : UserRole.SELLER,
            status: UserStatus.PENDING
        });
        await this.userRepository.save(newUser);

        return { message: 'Usuário registrado com sucesso.' };
    }

    async validateUser(email: string, password: string) {

        const user = await this.userRepository
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', { email })
            .getOne();

        if (!user) { throw new UnauthorizedException('Credenciais inválidas.'); }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) { throw new UnauthorizedException('Credenciais inválidas.'); }

        user.lastLogin = new Date();
        await this.userRepository.save(user);

        return user;
    }

    login(user: User) {

        const normalizedRole = user.role;

        const payload = { 
            sub: user.id, 
            email: user.email, 
            company: user.company,
            role: normalizedRole,
        };
        return { access_token: this.jwtService.sign(payload) };
    }
}
