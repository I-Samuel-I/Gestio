export type Transaction = {
  id: string;
  type: "entrada" | "saída";
  amount: number;
  description: string;
  category: "vendas" | "serviços" | "fornecedores" | "operacional" | "salários" | "marketing" | "outros";
  date: string;
  productId?: string;
  quantity?: number;
};

export async function PostTransaction(
  type: "entrada" | "saída",
  amount: number,
  description: string,
  category: "vendas" | "serviços" | "fornecedores" | "operacional" | "salários" | "marketing" | "outros",
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
    console.error("Error creating transaction:", error);
  }
}

export async function GetTransactions() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/transactions", {
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
    console.error("Error fetching transactions:", error);
  }
}

export async function GetRecentTransactions() {
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

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recent transactions:", error);
  }
}
