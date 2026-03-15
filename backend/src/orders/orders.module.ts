import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { Order } from './entities/order.entity';

@Module({
    imports: [ TypeOrmModule.forFeature([Order, Customer]) ],
    providers: [OrdersService],
    controllers: [OrdersController]
})
export class OrdersModule {}
