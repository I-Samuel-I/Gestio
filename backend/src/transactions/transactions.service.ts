import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { User } from 'src/users/entities/user.entity';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { ActivitiesService } from 'src/activities/activities.service';
import { TransactionType } from './enums/transaction-type.enum';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class TransactionsService {

    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
        private readonly activitiesService: ActivitiesService,
        private readonly productsService: ProductsService
    ) {}

    async create(createTransactionDto: CreateTransactionDto, user: User) {

        if (createTransactionDto.productId && createTransactionDto.quantity) {
            
            const product = await this.productsService.findOne(createTransactionDto.productId, user);

            const newStock = product.stock - createTransactionDto.quantity;
                
            await this.productsService.update(product.id, { 
                    stock: newStock,
                    available: newStock > 0 
            }, user);
        }

        const transaction = this.transactionRepository.save({ 
            ...createTransactionDto,
            productId: createTransactionDto.productId,
            quantity: createTransactionDto.quantity,
            company: user.company,
            userId: user.id
        });

        await this.activitiesService.createLog(user, 'transaction', 'payment', transaction);

        return transaction;
    }

    async findAll(user:User) {

        return this.transactionRepository.find({ 
            where: { company: user.company },
            order: { date: 'DESC' } 
        });
    }

    async findOne(id: string, user:User) {

        const transaction = await this.transactionRepository.findOne({ 
            where: { id, company: user.company }, 
        });

        if (!transaction) { throw new NotFoundException('Transaction not found.'); }

        return transaction;
    }

    async update(id: string, updateTransactionDto: UpdateTransactionDto, user:User) {

        const transaction = await this.findOne(id, user);

        Object.assign(transaction, updateTransactionDto);

        const updatedTransaction = await this.transactionRepository.save(transaction);

        await this.activitiesService.createLog(user, 'transaction', 'update', updatedTransaction);    

        return updatedTransaction;
    }

    async remove(id: string, user:User) {

        const transaction = await this.findOne(id, user);

        await this.transactionRepository.delete(id);

        await this.activitiesService.createLog(user, 'transaction', 'delete', transaction);

        return { message: 'Transaction deleted successfully.' };
    }

    async findRecent(user: User) {
        
        const transactions = await this.transactionRepository.find({
            where: { company: user.company },
            relations: ['user'], 
            order: { 
                date: 'DESC', 
                createdAt: 'DESC' 
            },
            take: 10,
        });

        return transactions.map(transaction => {

            const isIncome = transaction.type === TransactionType.INCOME;
            const signal = isIncome ? '+' : '-';

            return {

                id: transaction.id,
                description: transaction.description,
                transactionDate: transaction.date, 
                performedBy: transaction.user?.name || transaction.company,
                type: transaction.type,
            };
        });
    }
}
