
export const dashboard = {
    header:{
        totalClients: 120,
        productsActive: 10,
        monthlyRevenue: 27120,
    },

    IncomexExpense: [
        {
            month: "Janeiro",
            income: 24840,
            expense: 12730,
        },
        {
            month: "Fevereiro",
            income: 19800,
            expense: 10500,
        },
        {
            month: "Março",
            income: 22000,
            expense: 11000,
        },
        {
            month: "Abril",
            income: 25000,
            expense: 12000,
        },
        {
            month: "Maio",
            income: 27000,
            expense: 13000,
        },
        {
            month: "Junho",
            income: 30000,
            expense: 15000,
        },
    ],

    topProducts: [
        {
            Product: "Camiseta Azul",
            Sales: 150,
            Stock: 30,
            SoldStock: 20,
        },
        {
            Product: "Calça Jeans",
            Sales: 120,
            Stock: 20,
            SoldStock: 7,
        },
        {
            Product: "Tênis Esportivo",
            Sales: 100,
            Stock: 25,
            SoldStock: 25,    
        },
        {
            Product: "Jaqueta de Couro",
            Sales: 80,
            Stock: 10,
            SoldStock: 2,
        },
    ],

    recentActivities: [
        {
            id: "1",
            title: "Novo cliente cadastrado - Maria Silva",
            description: "Maria Silva se registrou como cliente",
            date: "2026-02-02T14:32:00",
            category: "client",
        },
        {
            id: "2",
            title: "Produto 'Camiseta Azul' adicionado ao estoque",
            description: "O produto 'Camiseta Azul' foi adicionado ao estoque",
            date: "2026-01-15T10:20:00",
            category: "product",
        },
        {
            id: "3",
            title: "Novo cliente cadastrado - João Santos",
            description: "João Santos se registrou como cliente",
            date: "2026-01-14T16:45:00",
            category: "client",
        },
        {
            id: "4",
            title:"Pagamento recebido - Pedido #1234",
            description: "Recebemos um pagamento de R$ 2450 referente ao pedido #1234",
            date: "2026-01-13T11:15:00",
            category: "payment",
        },
        {
            id: "5",
            title:"Nova venda registrada - Pedido #1235",
            description: "Registramos uma nova venda de R$ 3200 referente ao pedido #1235",
            date: "2026-01-12T09:30:00",
            category: "payment",
        }

    ]
}