import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Transaction } from '../transactions/entities/transaction.entity';
import { Product } from '../products/entities/product.entity';
import { Customer } from '../customers/entities/customer.entity';
import { User } from '../users/entities/user.entity';
import { TransactionType } from '../transactions/enums/transaction-type.enum';
import { TransactionCategory } from '../transactions/enums/transaction-category.enum';
import { CustomerStatus } from '../customers/enums/customer-status.enum';
import { CustomersReport, FinancialReport, SalesReport, StockReport } from './interfaces/reports.interface';

@Injectable()
export class ReportsService {

    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
    ) {}

    async salesReport(user: User): Promise<SalesReport> {

        const sales = await this.transactionRepository.find({
        where: { 
            company: user.company, 
            type: TransactionType.INCOME, 
            category: TransactionCategory.SALES 
        }});

        const totalAmount = sales.reduce((sum, t) => sum + Number(t.amount), 0);

        return { count: sales.length, totalAmount: parseFloat(totalAmount.toFixed(2)) };
    }

    async customersReport(user: User): Promise<CustomersReport> {
        
        const total = await this.customerRepository.count({ where: { company: user.company } });
        const active = await this.customerRepository.count({ where: { company: user.company, status: CustomerStatus.ACTIVE }});
        return { total, active };
    }

    async stockReport(user: User): Promise<StockReport> {
        
        const products = await this.productRepository.find({ where: { company: user.company } });
        const lowStock = 5;

        return {
            totalProducts: products.length,
            lowStockCount: products.filter(p => p.stock > 0 && p.stock <= lowStock).length,
            outOfStockCount: products.filter(p => p.stock <= 0).length,
        };
    }

    async financialReport(user: User): Promise<FinancialReport> {
        
        const transactions = await this.transactionRepository.find({ where: { company: user.company } });

        const revenue = transactions.filter(t => t.type === TransactionType.INCOME).reduce((sum, t) => sum + Number(t.amount), 0);

        const expenses = transactions.filter(t => t.type === TransactionType.EXPENSE).reduce((sum, t) => sum + Number(t.amount), 0);

        return { 
            revenue: parseFloat(revenue.toFixed(2)), 
            expenses: parseFloat(expenses.toFixed(2)), 
            balance: parseFloat((revenue - expenses).toFixed(2)) 
        };
    }

    async activeTotals(user: User) {

        const activeCustomers = await this.customerRepository.count({ where: { company: user.company, status: CustomerStatus.ACTIVE }});
        const activeProducts = await this.productRepository.count({ where: { company: user.company, stock: MoreThan(0) }  });

        return {
            activeCustomers,
            activeProducts
        };
    }
}