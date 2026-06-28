import { apiUrl } from "./api";
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
    const response = await fetch(apiUrl("/reports/sales"), {
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
    const response = await fetch(apiUrl("/reports/customers"), {
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
    const response = await fetch(apiUrl("/reports/stock"), {
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
      apiUrl(`/reports/financial${query}`),
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
export async function DownloadReportFinancialPdf(month?: number, year?: number) {
  const token = localStorage.getItem("token");
  const query = month && year ? `?month=${month}&year=${year}` : "";

  const response = await fetch(apiUrl(`/reports/financial/pdf${query}`), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error: " + response.statusText);
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "relatorio-financeiro.pdf";
  link.click();
  window.URL.revokeObjectURL(url);
}
