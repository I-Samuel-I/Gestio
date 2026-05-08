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
import { CashflowEntry, CashflowReport, CategoryBreakdown, CategoryDistributionReport, CustomersReport, FinancialReport, ReportPeriod, SalesReport, StockReport, TotalsByType } from './interfaces/reports.interface';

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

    async financialReport(user: User, query: ReportPeriodQuery = {}): Promise<FinancialReport> {

        const transactions = await this.transactionRepository.find({ where: { company: user.company } });
        const { filtered, period } = this.filterByPeriod(transactions, query);

        const revenue = filtered
            .filter(t => t.type === TransactionType.INCOME)
            .reduce((sum, t) => sum + Number(t.amount), 0);

        const expenses = filtered
            .filter(t => t.type === TransactionType.EXPENSE)
            .reduce((sum, t) => sum + Number(t.amount), 0);

        const totalsByType: TotalsByType = {
            income: parseFloat(revenue.toFixed(2)),
            expense: parseFloat(expenses.toFixed(2))
        };

        const categories = this.buildCategoryBreakdown(filtered);
        const cashFlow = this.buildCashFlow(filtered);

        return {
            period,
            revenue: parseFloat(revenue.toFixed(2)),
            expenses: parseFloat(expenses.toFixed(2)),
            balance: parseFloat((revenue - expenses).toFixed(2)),
            totalsByType,
            categories,
            cashFlow
        };
    }

    async categoryDistributionReport(user: User, query: ReportPeriodQuery = {}): Promise<CategoryDistributionReport> {

        const transactions = await this.transactionRepository.find({ where: { company: user.company } });
        const { filtered, period } = this.filterByPeriod(transactions, query);

        const incomeTransactions = filtered.filter(t => t.type === TransactionType.INCOME);
        const total = incomeTransactions.reduce((sum, t) => sum + Number(t.amount), 0);

        const byCategory = new Map<string, number>();
        for (const transaction of incomeTransactions) {
            const prev = byCategory.get(transaction.category) ?? 0;
            byCategory.set(transaction.category, prev + Number(transaction.amount));
        }

        const categories = [...byCategory.entries()].map(([name, revenue]) => ({
            name,
            revenue: parseFloat(revenue.toFixed(2)),
            percentage: total > 0 ? parseFloat(((revenue / total) * 100).toFixed(1)) : 0
        }));

        categories.sort((a, b) => b.revenue - a.revenue);

        return {
            period,
            categories,
            total: parseFloat(total.toFixed(2))
        };
    }

    async cashflowReport(user: User, query: ReportPeriodQuery = {}): Promise<CashflowReport> {

        const transactions = await this.transactionRepository.find({ where: { company: user.company } });
        const { filtered, period } = this.filterByPeriod(transactions, query);
        const cashFlow = this.buildCashFlow(filtered);

        return {
            period,
            cashFlow
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

    private filterByPeriod(transactions: Transaction[], query: ReportPeriodQuery) {
        const { startDate, endDate, period } = this.resolvePeriod(query);

        const filtered = transactions.filter(transaction => {
            const date = this.toDate(transaction.date);

            if (startDate && date < startDate) {
                return false;
            }

            if (endDate && date > endDate) {
                return false;
            }

            return true;
        });

        return { filtered, period };
    }

    private resolvePeriod(query: ReportPeriodQuery) {
        const month = this.parseNumber(query.month);
        const year = this.parseNumber(query.year);
        const now = new Date();

        let startDate: Date | undefined;
        let endDate: Date | undefined;

        const period: ReportPeriod = {};

        if (query.startDate || query.endDate) {
            if (query.startDate) {
                startDate = new Date(query.startDate);
                startDate.setHours(0, 0, 0, 0);
                period.startDate = this.toIsoDate(startDate);
            }

            if (query.endDate) {
                endDate = new Date(query.endDate);
                endDate.setHours(23, 59, 59, 999);
                period.endDate = this.toIsoDate(endDate);
            }
        } else if (month || year) {
            const resolvedYear = year ?? now.getFullYear();
            const resolvedMonth = month ?? now.getMonth() + 1;

            startDate = new Date(resolvedYear, resolvedMonth - 1, 1, 0, 0, 0, 0);
            endDate = new Date(resolvedYear, resolvedMonth, 0, 23, 59, 59, 999);

            period.month = resolvedMonth;
            period.year = resolvedYear;
            period.startDate = this.toIsoDate(startDate);
            period.endDate = this.toIsoDate(endDate);
        }

        return { startDate, endDate, period };
    }

    private buildCategoryBreakdown(transactions: Transaction[]): CategoryBreakdown[] {
        const byCategory = new Map<string, { total: number; count: number; type: string }>();

        for (const transaction of transactions) {
            const key = `${transaction.category}:${transaction.type}`;
            const prev = byCategory.get(key) ?? { total: 0, count: 0, type: transaction.type };

            byCategory.set(key, {
                total: prev.total + Number(transaction.amount),
                count: prev.count + 1,
                type: transaction.type
            });
        }

        return [...byCategory.entries()].map(([key, value]) => {
            const category = key.split(':')[0];
            return {
                category,
                type: value.type,
                total: parseFloat(value.total.toFixed(2)),
                count: value.count
            };
        }).sort((a, b) => b.total - a.total);
    }

    private buildCashFlow(transactions: Transaction[]): CashflowEntry[] {
        const byDate = new Map<string, { inflow: number; outflow: number }>();

        for (const transaction of transactions) {
            const dateKey = this.toDateKey(transaction.date);
            const prev = byDate.get(dateKey) ?? { inflow: 0, outflow: 0 };

            if (transaction.type === TransactionType.INCOME) {
                prev.inflow += Number(transaction.amount);
            } else {
                prev.outflow += Number(transaction.amount);
            }

            byDate.set(dateKey, prev);
        }

        const dates = [...byDate.keys()].sort();
        let running = 0;

        return dates.map(date => {
            const day = byDate.get(date)!;
            running += day.inflow - day.outflow;

            return {
                date,
                inflow: parseFloat(day.inflow.toFixed(2)),
                outflow: parseFloat(day.outflow.toFixed(2)),
                balance: parseFloat(running.toFixed(2))
            };
        });
    }

    private toDate(value: Date | string) {
        return value instanceof Date ? value : new Date(value);
    }

    private toDateKey(value: Date | string) {
        const date = this.toDate(value);
        return date.toISOString().slice(0, 10);
    }

    private toIsoDate(value: Date) {
        return value.toISOString().slice(0, 10);
    }

    private parseNumber(value?: string | number) {
        if (value === undefined || value === null || value === '') {
            return undefined;
        }

        const parsed = Number(value);
        return Number.isNaN(parsed) ? undefined : parsed;
    }
}

export type ReportPeriodQuery = {
    month?: string | number;
    year?: string | number;
    startDate?: string;
    endDate?: string;
};