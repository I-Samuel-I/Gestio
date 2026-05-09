import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Brackets, Repository } from 'typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from 'src/users/entities/user.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ActivitiesService } from 'src/activities/activities.service';

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
        private readonly activitiesService: ActivitiesService,
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

        const order = await this.orderRepository.save({
            ...createOrderDto,
            number: await this.orderNumberFormatter(user.company),
            creatorId: user.id,
            customerId: customer.id,
        });

        await this.activitiesService.createLog(user, 'order', 'sale', order);
        return order;    
    }
    
    async findAll(user:User, search?: string){

        const query = this.orderRepository
            .createQueryBuilder('orderEntity')
            .leftJoinAndSelect('orderEntity.customer', 'customer')
            .leftJoinAndSelect('orderEntity.creator', 'creator')
            .where('orderEntity.company = :company', { company: user.company });

        const searchTerm = search?.trim();

        if (searchTerm) {
            query.andWhere(
                new Brackets((qb) => {
                    qb.where('orderEntity.number ILIKE :search', { search: `%${searchTerm}%` })
                        .orWhere('orderEntity.title ILIKE :search', { search: `%${searchTerm}%` })
                        .orWhere('orderEntity.description ILIKE :search', { search: `%${searchTerm}%` })
                        .orWhere('customer.name ILIKE :search', { search: `%${searchTerm}%` })
                        .orWhere('creator.name ILIKE :search', { search: `%${searchTerm}%` })
                        .orWhere('CAST(orderEntity.status AS TEXT) ILIKE :search', { search: `%${searchTerm}%` })
                        .orWhere('CAST(orderEntity.type AS TEXT) ILIKE :search', { search: `%${searchTerm}%` });
                }),
            );
        }

        return query.orderBy('orderEntity.createdAt', 'DESC').getMany();
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

        const updatedOrder = await this.orderRepository.save(order);

        await this.activitiesService.createLog(user, 'order', 'update', updatedOrder);

        return updatedOrder;
    }

    async remove(id: string, user:User){

        const order = await this.findOne(id, user);

        await this.orderRepository.delete(id);

        await this.activitiesService.createLog(user, 'order', 'delete', order);

        return { message: 'Order deleted successfully.' };
    }
}
