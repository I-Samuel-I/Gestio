export type FinancePeriod = {
  month?: number;
  year?: number;
  startDate?: string;
  endDate?: string;
};

export type FinanceTotalsByType = {
  income: number;
  expense: number;
};

export type FinanceCategoryBreakdown = {
  category: string;
  type: string;
  total: number;
  count: number;
};

export type FinanceCashFlowEntry = {
  date: string;
  inflow: number;
  outflow: number;
  balance: number;
};

export type FinanceReport = {
  period: FinancePeriod;
  revenue: number;
  expenses: number;
  balance: number;
  totalsByType: FinanceTotalsByType;
  categories: FinanceCategoryBreakdown[];
  cashFlow: FinanceCashFlowEntry[];
};

export type FinanceCategoryDistributionItem = {
  name: string;
  revenue: number;
  percentage: number;
};

export type FinanceCategoryDistribution = {
  period: FinancePeriod;
  categories: FinanceCategoryDistributionItem[];
  total: number;
};

export type FinanceCashflowReport = {
  period: FinancePeriod;
  cashFlow: FinanceCashFlowEntry[];
};

export type FinanceTransaction = {
  id: string;
  type: "entrada" | "saída";
  amount: number;
  description: string;
  category:
    | "vendas"
    | "serviços"
    | "fornecedores"
    | "operacional"
    | "salários"
    | "marketing"
    | "outros";
  date: string;
  productId?: string;
  quantity?: number;
};

export type RecentFinanceTransaction = {
  id: string;
  description: string;
  amount: number;
  category: string;
  quantity?: number;
  transactionDate: string;
  performedBy: string;
  type: "entrada" | "saída";
};

export async function GetFinance(
  month?: number,
  year?: number,
  startDate?: string,
  endDate?: string,
) {
  try {
    const token = localStorage.getItem("token");
    const query = new URLSearchParams();

    if (month) query.append("month", String(month));
    if (year) query.append("year", String(year));
    if (startDate) query.append("startDate", startDate);
    if (endDate) query.append("endDate", endDate);

    const response = await fetch(
      `http://localhost:3000/reports/financial${query.toString() ? `?${query.toString()}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
    }

    const data: FinanceReport = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching finance report:", error);
  }
}

export async function GetFinanceCategoryDistribution(
  month?: number,
  year?: number,
  startDate?: string,
  endDate?: string,
) {
  try {
    const token = localStorage.getItem("token");
    const query = new URLSearchParams();

    if (month) query.append("month", String(month));
    if (year) query.append("year", String(year));
    if (startDate) query.append("startDate", startDate);
    if (endDate) query.append("endDate", endDate);

    const response = await fetch(
      `http://localhost:3000/reports/category-distribution${query.toString() ? `?${query.toString()}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
    }

    const data: FinanceCategoryDistribution = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching finance category distribution:", error);
  }
}

export async function GetFinanceCashflow(
  month?: number,
  year?: number,
  startDate?: string,
  endDate?: string,
) {
  try {
    const token = localStorage.getItem("token");
    const query = new URLSearchParams();

    if (month) query.append("month", String(month));
    if (year) query.append("year", String(year));
    if (startDate) query.append("startDate", startDate);
    if (endDate) query.append("endDate", endDate);

    const response = await fetch(
      `http://localhost:3000/reports/cashflow${query.toString() ? `?${query.toString()}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
    }

    const data: FinanceCashflowReport = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching finance cashflow:", error);
  }
}

export async function GetFinanceTransactions(search?: string) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:3000/transactions${search ? `?search=${encodeURIComponent(search)}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching finance transactions:", error);
  }
}

export async function GetRecentFinanceTransactions() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/transactions/recent", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
    }

    const data: RecentFinanceTransaction[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recent finance transactions:", error);
  }
}

export async function GetFinanceTransactionById(id: string) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/transactions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
    }

    const data: FinanceTransaction = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching finance transaction:", error);
  }
}

export async function PostFinanceTransaction(
  type: "entrada" | "saída",
  amount: number,
  description: string,
  category:
    | "vendas"
    | "serviços"
    | "fornecedores"
    | "operacional"
    | "salários"
    | "marketing"
    | "outros",
  date: string,
  productId?: string,
  quantity?: number,
) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        type,
        amount,
        description,
        category,
        date: new Date(date),
        productId,
        quantity,
      }),
    });

    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating finance transaction:", error);
  }
}

export async function UpdateFinanceTransaction(
  id: string,
  type: "entrada" | "saída",
  amount: number,
  description: string,
  category:
    | "vendas"
    | "serviços"
    | "fornecedores"
    | "operacional"
    | "salários"
    | "marketing"
    | "outros",
  date: string,
  productId?: string,
  quantity?: number,
) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/transactions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        type,
        amount,
        description,
        category,
        date: new Date(date),
        productId,
        quantity,
      }),
    });

    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating finance transaction:", error);
  }
}

export async function DeleteFinanceTransaction(id: string) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/transactions/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting finance transaction:", error);
  }
}
