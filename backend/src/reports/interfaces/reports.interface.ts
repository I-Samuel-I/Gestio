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
    revenue: number;
    expenses: number;
    balance: number;
}