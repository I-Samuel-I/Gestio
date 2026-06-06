import { BadRequestException, Injectable } from '@nestjs/common';
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
import PDFDocument from 'pdfkit';

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
            }
        });

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

    async financialReportPdf(user: User, query: ReportPeriodQuery = {}): Promise<Buffer> {

        const transactions = await this.transactionRepository.find({ where: { company: user.company } });
        const { filtered, period } = this.filterByPeriod(transactions, query);

        const revenue = filtered.filter(t => t.type === TransactionType.INCOME).reduce((sum, t) => sum + Number(t.amount), 0);

        const expenses = filtered.filter(t => t.type === TransactionType.EXPENSE).reduce((sum, t) => sum + Number(t.amount), 0);

        const totalsByType: TotalsByType = {
            income: parseFloat(revenue.toFixed(2)),
            expense: parseFloat(expenses.toFixed(2))
        };

        const recentTransactions = this.pickRecentTransactions(filtered, 10);

        return this.renderFinancialPdf({
            period,
            revenue: parseFloat(revenue.toFixed(2)),
            expenses: parseFloat(expenses.toFixed(2)),
            balance: parseFloat((revenue - expenses).toFixed(2)),
            totalsByType,
            recentTransactions
        });
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
                const parsedStart = this.parseDate(query.startDate);
                if (!parsedStart) {
                    throw new BadRequestException('Data inicial inválida.');
                }
                startDate = parsedStart;
                startDate.setHours(0, 0, 0, 0);
                period.startDate = this.toIsoDate(startDate);
            }

            if (query.endDate) {
                const parsedEnd = this.parseDate(query.endDate);
                if (!parsedEnd) {
                    throw new BadRequestException('Data final inválida.');
                }
                endDate = parsedEnd;
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
        return this.formatUtcDate(date);
    }

    private toIsoDate(value: Date) {
        return this.formatLocalDate(value);
    }
    private formatLocalDate(value: Date) {
        const year = value.getFullYear();
        const month = String(value.getMonth() + 1).padStart(2, '0');
        const day = String(value.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    private formatUtcDate(value: Date) {
        const year = value.getUTCFullYear();
        const month = String(value.getUTCMonth() + 1).padStart(2, '0');
        const day = String(value.getUTCDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    private parseNumber(value?: string | number) {
        if (value === undefined || value === null || value === '') {
            return undefined;
        }

        const parsed = Number(value);
        return Number.isNaN(parsed) ? undefined : parsed;
    }

    private parseDate(value?: string) {
        if (!value) {
            return undefined;
        }

        const trimmed = value.trim();
        const dateOnlyMatch = /^\d{4}-\d{2}-\d{2}$/.exec(trimmed);

        if (dateOnlyMatch) {
            const [year, month, day] = trimmed.split('-').map(Number);
            const local = new Date(year, month - 1, day);
            return Number.isNaN(local.getTime()) ? undefined : local;
        }

        const parsed = new Date(trimmed);
        return Number.isNaN(parsed.getTime()) ? undefined : parsed;
    }

    private pickRecentTransactions(transactions: Transaction[], limit: number) {
        return [...transactions].sort((a, b) => {
            
            const dateA = this.toDate(a.date).getTime();
            const dateB = this.toDate(b.date).getTime();

            if (dateA !== dateB) { return dateB - dateA; }

            const createdA = this.toDate(a.createdAt).getTime();
            const createdB = this.toDate(b.createdAt).getTime();
            return createdB - createdA;
        }).slice(0, limit);
    }

    private renderFinancialPdf(data: {
        
        period: ReportPeriod;
        revenue: number;
        expenses: number;
        balance: number;
        totalsByType: TotalsByType;
        recentTransactions: Transaction[];

    }): Promise<Buffer> {

        return new Promise((resolve, reject) => {

            const doc = new PDFDocument({ margin: 50 });
            const chunks: Buffer[] = [];

            doc.on('data', chunk => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));
            doc.on('error', err => reject(err));

            doc.fontSize(18).font('Helvetica-Bold').text('RELATÓRIO FINANCEIRO', { align: 'center' });
            doc.moveDown(0.3);
            doc.fontSize(10).font('Helvetica').text(`Período: ${this.formatPeriod(data.period)}`, { align: 'left' });
            doc.fontSize(10).text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, { align: 'right' });
            doc.moveDown(0.5);

            doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
            doc.moveDown(0.8);

            const boxX = 50;
            const boxY = doc.y;
            const boxWidth = 495;
            const boxHeight = 70;

            doc.roundedRect(boxX, boxY, boxWidth, boxHeight, 4).stroke();
            const leftColX = boxX + 12;
            const rightColX = boxX + boxWidth - 140;

            doc.fontSize(11).font('Helvetica-Bold').text('Resumo', leftColX, boxY + 8);
            doc.fontSize(10).font('Helvetica').text(`Receitas: ${this.formatMoney(data.revenue)}`, leftColX, boxY + 26);
            doc.text(`Despesas: ${this.formatMoney(data.expenses)}`, leftColX, boxY + 42);

            doc.fontSize(10).font('Helvetica-Bold').text('Saldo', rightColX, boxY + 8);
            doc.fontSize(12).font('Helvetica-Bold').text(this.formatMoney(data.balance), rightColX, boxY + 28);

            doc.moveDown(5);

            doc.moveDown(0.2);
            doc.fontSize(12).font('Helvetica-Bold').text('Transações recentes', 50);
            doc.moveDown(0.3);

            const startX = 50;
            let y = doc.y;
            const col = {
                date: startX,
                type: startX + 80,
                category: startX + 170,
                description: startX + 300,
                amount: 500
            };

            doc.fontSize(10).font('Helvetica-Bold');
            doc.text('Data', col.date, y);
            doc.text('Tipo', col.type, y);
            doc.text('Categoria', col.category, y);
            doc.text('Descrição', col.description, y);
            doc.text('Valor', col.amount, y, { width: 80, align: 'right' });
            y += 18;

            doc.font('Helvetica').fontSize(10);

            if (data.recentTransactions.length === 0) {
                doc.text('Nenhuma transação encontrada no período.', startX, y);
            } else {
                for (const t of data.recentTransactions) {
                    if (y > 720) {
                        doc.addPage();
                        y = 50;
                    }

                    const date = this.toIsoDate(this.toDate(t.date));
                    doc.text(date, col.date, y);
                    doc.text(t.type, col.type, y);
                    doc.text(String(t.category), col.category, y);
                    const desc = String(t.description ?? '').length > 30 ? String(t.description).slice(0, 30) + '...' : String(t.description ?? '');
                    doc.text(desc, col.description, y, { width: 180 });
                    doc.text(this.formatMoney(Number(t.amount)), col.amount, y, { width: 80, align: 'right' });

                    y += 16;
                }
            }

            doc.moveDown(1);
            doc.fontSize(9).font('Helvetica-Oblique').text('Relatório gerado pelo sistema Gestio.', 50, doc.y + 10);

            doc.end();
        });
    }

    private formatMoney(value: number) { return Number(value).toFixed(2); }

    private formatPeriod(period: ReportPeriod) {

        if (period.startDate || period.endDate) {
            const start = period.startDate ?? 'inicio';
            const end = period.endDate ?? 'fim';
            return `${start} ate ${end}`;
        }

        if (period.month && period.year) { return `${String(period.month).padStart(2, '0')}/${period.year}`; }

        if (period.year) { return String(period.year); }

        return 'todo o periodo';
    }
}

export type ReportPeriodQuery = {
    month?: string | number;
    year?: string | number;
    startDate?: string;
    endDate?: string;
};