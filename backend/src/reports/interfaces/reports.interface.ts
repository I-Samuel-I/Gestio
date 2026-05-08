export interface SalesReport {
    count: number;
    totalAmount: number;
}

export interface CustomersReport {
    total: number;
    active: number;
}

export interface StockReport {
    totalProducts: number;
    lowStockCount: number;
    outOfStockCount: number;
}

export interface FinancialReport {
    period: ReportPeriod;
    revenue: number;
    expenses: number;
    balance: number;
    totalsByType: TotalsByType;
    categories: CategoryBreakdown[];
    cashFlow: CashflowEntry[];
}

export interface ReportPeriod {
    month?: number;
    year?: number;
    startDate?: string;
    endDate?: string;
}

export interface TotalsByType {
    income: number;
    expense: number;
}

export interface CategoryBreakdown {
    category: string;
    type: string;
    total: number;
    count: number;
}

export interface CategoryDistributionItem {
    name: string;
    revenue: number;
    percentage: number;
}

export interface CategoryDistributionReport {
    period: ReportPeriod;
    categories: CategoryDistributionItem[];
    total: number;
}

export interface CashflowEntry {
    date: string;
    inflow: number;
    outflow: number;
    balance: number;
}

export interface CashflowReport {
    period: ReportPeriod;
    cashFlow: CashflowEntry[];
}