import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from 'src/users/entities/user.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderType } from './enums/order-type.enum';

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>
    ){}

    private async orderNumberFormatter(company:string): Promise<string>{

    const lastOrder = await this.orderRepository.findOne({
            where: { company },
            order: { createdAt: 'DESC' },
        });

        let nextNumber = 1;

        if (lastOrder) {
            const numericPart = parseInt(lastOrder.number.replace('OS-', ''));
            nextNumber = numericPart + 1;
        }

        return `OS-${nextNumber.toString().padStart(4, '0')}`;
    }

    async create(createOrderDto: CreateOrderDto, user: User) {

        const customer = await this.customerRepository.findOne({ 
            where: { id: createOrderDto.customerId, company: user.company }, 
        });

        if (!customer) throw new NotFoundException('Customer not found in your company.');

        const order = this.orderRepository.create({
            ...createOrderDto,
            number: await this.orderNumberFormatter(user.company),
            creatorId: user.id,
            customerId: customer.id,
        });

        return this.orderRepository.save(order);
    }
    
    async findAll(user:User){

        return await this.orderRepository.find({
            where: { company: user.company },
            relations: ['customer', 'creator'],
            order: { createdAt: 'DESC' }
        }); 
    }

    async findOne(id: string, user:User){

        const order = await this.orderRepository.findOne({
            where: { id, company: user.company},
            relations: ['customer', 'creator']
        });

        if (!order){ throw new NotFoundException('Order not found.') }

        return order;
    }

    async update(id: string, updateOrderDto:UpdateOrderDto, user:User){

        const order = await this.findOne(id, user);

        Object.assign(order, updateOrderDto);

        return await this.orderRepository.save(order);
    }

    async remove(id: string, user:User){

        const order = await this.findOne(id, user);

        await this.orderRepository.remove(order);

        return { message: 'Order deleted successfully.' };
    }
}
