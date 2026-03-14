export const finances = {
  header: {
    currentBalance: 12110,
    revenueMonth: 24840,
    expensesMonth: 12730,
    accountsReceivable: 8694,
  },

  cashFlow: {
    inflow: [
      { date: "2026-01-04", value: 4500 },
      { date: "2026-01-10", value: 7800 },
      { date: "2026-01-13", value: 5000 },
      { date: "2026-01-14", value: 3200 },
      { date: "2026-01-15", value: 1890 },
      { date: "2026-01-16", value: 2450 },
    ],

    outflow: [
      { date: "2026-01-06", value: 280 },
      { date: "2026-01-11", value: 3500 },
      { date: "2026-01-15", value: 450 },
      { date: "2026-01-16", value: 8500 },
    ],
  },

  categoryDistribution: [
    {
      category: "Vendas",
      value: 19872,
    },
    {
      category: "Serviços",
      value: 4968,
    },
    {
      category: "Outros",
      value: 12900,
    },
  ],

  transactions: [
    {
      id: "1",
      title: "Venda #1234 - Maria Silva",
      date: "2026-01-16T14:32:00",
      value: 2450,
      type: "income",
    },
    {
      id: "2",
      title: "Fornecedor - Eletrônicos LTDA",
      date: "2026-01-16T11:15:00",
      value: 8500,
      type: "expense",
    },
    {
      id: "3",
      title: "Venda #1233 - João Santos",
      date: "2026-01-15T16:45:00",
      value: 1890,
      type: "income",
    },
    {
      id: "4",
      title: "Despesa operacional",
      date: "2026-01-15T10:20:00",
      value: 450,
      type: "expense",
    },
  ],
};
