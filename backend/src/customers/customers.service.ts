import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { User } from 'src/users/entities/user.entity';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ActivitiesService } from 'src/activities/activities.service';

@Injectable()
export class CustomersService {

    constructor(
        @InjectRepository(Customer)
        private readonly customersRepository: Repository<Customer>,
        private readonly activitiesService: ActivitiesService,
    ){}

    async create(createCustomerDto:CreateCustomerDto, user: User){

        const customer = await this.customersRepository.save({
            ...createCustomerDto,
            userId: user.id,  
            company: user.company
        });

        await this.activitiesService.createLog(user, 'customer', 'create', customer);

        return customer;
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

        const updatedCustomer = await this.customersRepository.save(customer);

        await this.activitiesService.createLog(
            user, 
            'customer', 
            'update', 
            updatedCustomer
        );

        return updatedCustomer;
    }

    async remove(id: string, user: User){

        const customer = await this.findOne(id, user);

        await this.customersRepository.remove(customer);

        await this.activitiesService.createLog(user, 'customer', 'delete', customer);

        return { message: 'Customer deleted successfully.' }
    }
}
