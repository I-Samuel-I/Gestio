import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsController } from './settings.controller';
import { CompanyController } from './company.controller';
import { SettingsService } from './settings.service';
import { Company } from './entities/company.entity';
import { UserPreferences } from './entities/user-preferences.entity';
import { User } from 'src/users/entities/user.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Product } from 'src/products/entities/product.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Activity } from 'src/activities/entities/activity.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Company, UserPreferences, User, Customer, Product, Order, Transaction, Activity])],
    controllers: [SettingsController, CompanyController],
    providers: [SettingsService],
    exports: [SettingsService],
})
export class SettingsModule {}