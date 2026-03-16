import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { User } from 'src/users/entities/user.entity';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {

    constructor(
        @InjectRepository(Customer)
        private readonly customersRepository: Repository<Customer>,
    ){}

    async create(createCustomerDto:CreateCustomerDto, user: User){

        const customer = this.customersRepository.create({
            ...createCustomerDto,
            userId: user.id,  
            company: user.company
        });

        return this.customersRepository.save(customer);
    }

    async findAll(user: User){

        return await this.customersRepository.find({
            where: { company: user.company },
            order: { name: 'ASC' }
        });
    }

    async findOne(id: string, user: User){

        const customer = await this.customersRepository.findOne({
            where: { id, company: user.company }
        })

        if (!customer){ throw new NotFoundException('Customer not found in your company.')}
        
        return customer;
    }

    async update(id: string, updateCustomerDto: UpdateCustomerDto, user:User){

        const customer = await this.findOne(id, user);

        Object.assign(customer, updateCustomerDto);

        return await this.customersRepository.save(customer);
    }

    async remove(id: string, user: User){

        const customer = await this.findOne(id, user);

        await this.customersRepository.remove(customer);

        return { message: 'Customer deleted successfully.' }
    }
}
