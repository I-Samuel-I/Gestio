import { apiUrl } from "./api";
export interface FinancialReport {
  revenue: number;
  expenses: number;
  balance: number;
}

export async function GetFinancialReport(): Promise<FinancialReport | null> {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(apiUrl("/reports/financial"), {
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
    console.error("Error fetching financial report:", error);
    return null;
  }
}
