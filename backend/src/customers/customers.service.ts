import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { User } from 'src/users/entities/user.entity';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CurrentUser } from 'src/auth/roles.decorator';

@Injectable()
export class CustomersService {

    constructor(
        @InjectRepository(Customer)
        private readonly customersRepository: Repository<Customer>,
    ){}

    async create(createCustomerDto:CreateCustomerDto, @CurrentUser() user: User){

        const customer = this.customersRepository.create({
            ...createCustomerDto,
            user: user
        });

        return this.customersRepository.save(customer);
    }

    async findAll(userId: string){

        return await this.customersRepository.find({
            where: { user: {id: userId} },
            relations: ['user'],
            order: { created_at: 'DESC' }
        });
    }

    async findOne(id: string, userId: string){

        const customer = await this.customersRepository.findOne({
            where: { id, user: { id:userId } }
        })

        if (!customer){ throw new NotFoundException('Customer not found.')}
        
        return customer;

    }

    async update(id: string, updateCustomerDto: UpdateCustomerDto, userId: string){

        const customer = await this.findOne(id, userId);

        Object.assign(customer, updateCustomerDto);

        return await this.customersRepository.save(customer);

    }

    async remove(id: string, userId: string){

        const customer = await this.findOne(id, userId);

        await this.customersRepository.remove(customer);

        return { message: 'Customer deleted successfully.' }

    }

}
