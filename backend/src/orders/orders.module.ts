import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { Order } from './entities/order.entity';
import { ActivitiesModule } from 'src/activities/activities.module';

@Module({
    imports: [ TypeOrmModule.forFeature([Order, Customer]), ActivitiesModule ],
    providers: [OrdersService],
    controllers: [OrdersController]
})
export class OrdersModule {}
