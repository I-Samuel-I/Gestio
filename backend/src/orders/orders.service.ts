import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from 'src/users/entities/user.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CurrentUser } from 'src/auth/roles.decorator';

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,

        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>

    ){}

    private async orderNumberFormatter(): Promise<string>{

        const lastOrder = await this.orderRepository.find({

            order: { created_at: 'DESC' },
            take: 1

        })

        let nextNumber = 1;

        if (lastOrder.length > 0){

            const lastNumber = lastOrder[0].number;
            const numericPart = parseInt(lastNumber.replace('OS-', ''));
            nextNumber = numericPart + 1;

        }

        return `OS-${nextNumber.toString().padStart(4, '0')}`;

    }

    async create(createOrderDto: CreateOrderDto, currentUser: any) {

        const customer = await this.customerRepository.findOne({ where: { id: createOrderDto.customer_id }, });

        if (!customer) throw new NotFoundException('Customer not found.');

        const order = this.orderRepository.create({
            ...createOrderDto,
            number: await this.orderNumberFormatter(),
            creator: { id: currentUser.userId } as User, 
            customer,
        });

        const savedOrder = await this.orderRepository.save(order);

        return {
            ...savedOrder,
            customer: savedOrder.customer.id,
            creator: savedOrder.creator.id, 
        };
    }
    
    async findAll(){

        return await this.orderRepository.find({

            relations: ['customer', 'creator'],
            order: { created_at: 'DESC' }

        });
            
    }

    async findOne(id: string){

        const order = await this.orderRepository.findOne({

            where: { id },
            relations: ['customer', 'creator']

        });

        if (!order){ throw new NotFoundException('Order not found.') }

        return order;

    }

    async update(id: string, updateOrderDto:UpdateOrderDto){

        const order = await this.findOne(id);

        Object.assign(order, updateOrderDto);

        return await this.orderRepository.save(order);

    }

    async remove(id: string){

        const order = await this.findOne(id);

        await this.orderRepository.remove(order);

        return { message: 'Order deleted successfully.' };

    }


}
