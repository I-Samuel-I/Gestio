import { API_URL, apiUrl } from "./api";
export type DashboardCustomersReport = {
  total: number;
  active: number;
};

export type DashboardStockReport = {
  totalProducts: number;
  lowStockCount: number;
  outOfStockCount: number;
};

export type DashboardSalesReport = {
  count: number;
  totalAmount: number;
};

export type DashboardFinancialReport = {
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

export type DashboardActivity = {
  id: string;
  title: string;
  description: string;
  type: "customer" | "transaction" | "product" | "order";
  company: string;
  createdAt: string;
};

export async function GetDashboardCustomers() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(apiUrl("/reports/customers"), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
    }

    const data: DashboardCustomersReport = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching dashboard customers:", error);
  }
}

export async function GetDashboardStock() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(apiUrl("/reports/stock"), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
    }

    const data: DashboardStockReport = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching dashboard stock:", error);
  }
}

export async function GetDashboardSales() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(apiUrl("/reports/sales"), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
    }

    const data: DashboardSalesReport = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching dashboard sales:", error);
  }
}

export async function GetDashboardActivities() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(apiUrl("/activities"), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
    }

    const data: DashboardActivity[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching dashboard activities:", error);
  }
}

export async function GetDashboardFinancial(month: number, year: number) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_URL}/reports/financial?month=${month}&year=${year}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
    }

    const data: DashboardFinancialReport = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching dashboard financial report:", error);
  }
}
