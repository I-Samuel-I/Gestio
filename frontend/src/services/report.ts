export type ReportSales = {
  count: number;
  totalAmount: number;
};

export type ReportCustomers = {
  total: number;
  active: number;
};

export type ReportStock = {
  totalProducts: number;
  lowStockCount: number;
  outOfStockCount: number;
};

export type ReportFinancial = {
  period: {
    month?: number;
    year?: number;
    startDate?: string;
    endDate?: string;
  };
  revenue: number;
  expenses: number;
  balance: number;
  totalsByType: {
    income: number;
    expense: number;
  };
  categories: {
    category: string;
    type: string;
    total: number;
    count: number;
  }[];
  cashFlow: {
    date: string;
    inflow: number;
    outflow: number;
    balance: number;
  }[];
};

export async function GetReportSales() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/reports/sales", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
    }

    const data: ReportSales = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching sales report:", error);
  }
}

export async function GetReportCustomers() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/reports/customers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
    }

    const data: ReportCustomers = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching customers report:", error);
  }
}

export async function GetReportStock() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/reports/stock", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
    }

    const data: ReportStock = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching stock report:", error);
  }
}

export async function GetReportFinancial(month?: number, year?: number) {
  try {
    const token = localStorage.getItem("token");
    const query =
      month && year ? `?month=${month}&year=${year}` : "";

    const response = await fetch(
      `http://localhost:3000/reports/financial${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
    }

    const data: ReportFinancial = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching financial report:", error);
  }
}
