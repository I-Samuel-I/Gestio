import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) {}

    async create(data: CreateUserDto) {

        const exists = await this.userRepo.findOne({ where: { email: data.email } });

        if (exists) { throw new BadRequestException('User already exists.'); }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = this.userRepo.create({
            email: data.email,
            password: hashedPassword,
            role: data.role,
        });

        return this.userRepo.save(user);

    }

    findAll() { return this.userRepo.find({ where: { isActive: true } }); }

    findById(id: number) { return this.userRepo.findOneBy({ id });}

    async update(id: number, data: UpdateUserDto) { 
        
        if (data.password) { data.password = await bcrypt.hash(data.password, 10); }
        return this.userRepo.update(id, data);
    }

    deactivate(id: number) { return this.userRepo.update(id, { isActive: false });}
}

