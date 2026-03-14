import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRole } from './enums/user-role.enum';
import { User } from './entities/user.entity';

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
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: UserRole.SELLER,
            phone: data.phone,
            company: data.company,
        });

        return this.userRepo.save(user);

    }

    findAll() { return this.userRepo.find({ where: { isActive: true } }); }

    async findById(id: string) { 
        
        const user = await this.userRepo.findOneBy({id});

        if (!user){ throw new NotFoundException('User not found') }

        return user;
    
    }

    async update(id: string, data: UpdateUserDto) { 
        
        const user = await this.findById(id);

        if (data.password) { data.password = await bcrypt.hash(data.password, 10); }

        Object.assign(user, data);

        return this.userRepo.save(user);
    }

    async deactivate(id: string) { 

        const user = await this.findById(id);

        user.isActive = false;
        
        return this.userRepo.save(user);
    
    }
}

