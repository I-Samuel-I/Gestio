import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { ActivitiesModule } from 'src/activities/activities.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Transaction]), 
        ActivitiesModule,
        ProductsModule
    ],
    controllers: [TransactionsController],
    providers: [TransactionsService]
})
export class TransactionsModule {}
