import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { User } from 'src/users/entities/user.entity';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {

    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
    ) {}

    async create(createTransactionDto: CreateTransactionDto, user: User) {

        const transaction = this.transactionRepository.create({ 
            ...createTransactionDto,
            company: user.company,
            userId: user.id
        });

        return this.transactionRepository.save(transaction);
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

        return this.transactionRepository.save(transaction);
    }

    async remove(id: string, user:User) {

        const transaction = await this.findOne(id, user);

        await this.transactionRepository.remove(transaction);

        return { message: 'Transaction deleted successfully.' };
    }

    async findRecent(user: User) {
        
        return await this.transactionRepository.find({
            where: { company: user.company },
            order: { date: 'DESC', createdAt: 'DESC' },
            take: 10,
        });
    }
}
