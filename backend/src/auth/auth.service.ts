import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async register(email: string, password: string) {

        const userExists = await this.userRepository.findOne({ where: { email } });

        if (userExists) throw new BadRequestException('User already exists.');

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = this.userRepository.create({ email, password: hashedPassword, role: 'user' });
        await this.userRepository.save(newUser);

        return { message: 'User registered successfully.' };
    }

    async validateUser(email: string, password: string): Promise<User> {

        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) throw new UnauthorizedException('Invalid credentials.');

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new UnauthorizedException('Invalid credentials.');

        return user;
    }

    login(user: User) {

        const payload = { sub: user.id, email: user.email, role: user.role, };
        return { access_token: this.jwtService.sign(payload) };
    }
}
