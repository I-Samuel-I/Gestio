import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Product } from 'src/products/entities/product.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Order } from 'src/orders/entities/order.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Transaction, Product, Customer, Order]),
    ],
    controllers: [ReportsController],
    providers: [ReportsService]
})
export class ReportsModule {}
