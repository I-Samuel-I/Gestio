import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
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

        const company = data.company.trim().toUpperCase();

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = this.userRepo.create({
            ...data,
            company,
            password: hashedPassword,
            role: UserRole.SELLER,
        });

        return this.userRepo.save(user);
    }

    findAll(currentUser: User, search?: string) {
        const query = this.userRepo
            .createQueryBuilder('user')
            .where('user.company = :company', { company: currentUser.company })
            .andWhere('user.isActive = :isActive', { isActive: true });

        const searchTerm = search?.trim();

        if (searchTerm) {
            query.andWhere(
                new Brackets((qb) => {
                    qb.where('user.name ILIKE :search', { search: `%${searchTerm}%` })
                        .orWhere('user.email ILIKE :search', { search: `%${searchTerm}%` })
                        .orWhere('user.phone ILIKE :search', { search: `%${searchTerm}%` })
                        .orWhere('CAST(user.role AS TEXT) ILIKE :search', { search: `%${searchTerm}%` })
                        .orWhere('CAST(user.status AS TEXT) ILIKE :search', { search: `%${searchTerm}%` });
                }),
            );
        }

        return query.orderBy('user.createdAt', 'DESC').getMany();
    }

    async findById(id: string, currentUser: User) { 
        
        const user = await this.userRepo.findOne({
            where:{ id, company:currentUser.company }
        }); 

        if (!user){ throw new NotFoundException('User not found in your company.') }

        return user;
    }

    async update(id: string, data: UpdateUserDto, currentUser: User) { 
        
        const user = await this.findById(id, currentUser);

        if (data.password) { data.password = await bcrypt.hash(data.password, 10); }

        Object.assign(user, data);

        if (user.company) {
            user.company = user.company.trim().toUpperCase();
        }

        return this.userRepo.save(user);
    }

    async deactivate(id: string, currentUser: User) { 

        const user = await this.findById(id, currentUser);

        user.isActive = false;
        
        return this.userRepo.save(user);
    }
}