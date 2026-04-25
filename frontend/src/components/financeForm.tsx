"use client";

import { useEffect, useState, type FormEvent } from "react";
import Input from "./input";
import { PostTransaction, type Transaction } from "@/services/transactions";
import { GetProducts, type Product } from "@/services/products";

type FinanceFormProps = {
    onClose?: () => void;
    onCreated?: () => void;
};

type TransactionFormState = {
    type: "entrada" | "saída";
    amount: number;
    description: string;
    category: "vendas" | "serviços" | "fornecedores" | "operacional" | "salários" | "marketing" | "outros";
    date: string;
    productId?: string;
    quantity?: number;
};

const TRANSACTION_CATEGORIES = [
    { value: "vendas", label: "Vendas" },
    { value: "serviços", label: "Serviços" },
    { value: "fornecedores", label: "Fornecedores" },
    { value: "operacional", label: "Operacional" },
    { value: "salários", label: "Salários" },
    { value: "marketing", label: "Marketing" },
    { value: "outros", label: "Outros" },
];

function getInitialTransactionState(): TransactionFormState {
    const today = new Date().toISOString().split('T')[0];
    return {
        type: "entrada",
        amount: 0,
        description: "",
        category: "vendas",
        date: today,
    };
}

export default function FinanceForm({
    onClose,
    onCreated,
}: FinanceFormProps) {
    const [transaction, setTransaction] = useState<TransactionFormState>(
        getInitialTransactionState(),
    );
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadProducts = async () => {
            const data = await GetProducts();
            setProducts(data ?? []);
        };
        loadProducts();
    }, []);

    const handleSubmitTransaction = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const saved = await PostTransaction(
                transaction.type,
                transaction.amount,
                transaction.description,
                transaction.category,
                transaction.date,
                transaction.productId,
                transaction.quantity,
            );

            if (saved) {
                onCreated?.();
                onClose?.();
                setTransaction(getInitialTransactionState());
            }
        } catch (error) {
            console.error("Error creating transaction:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmitTransaction}>
            <div className="flex flex-col gap-5">
                {/* Tipo de Transação */}
                <div>
                    <label className="text-sm font-medium text-slate-700 block mb-2">
                        Tipo
                    </label>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => setTransaction({ ...transaction, type: "entrada" })}
                            className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                                transaction.type === "entrada"
                                    ? "bg-green-500 text-white"
                                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                        >
                            ↑ Entrada
                        </button>
                        <button
                            type="button"
                            onClick={() => setTransaction({ ...transaction, type: "saída" })}
                            className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                                transaction.type === "saída"
                                    ? "bg-red-500 text-white"
                                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                        >
                            ↓ Saída
                        </button>
                    </div>
                </div>

                {/* Vincular Produto */}
                <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-sm font-medium text-slate-700">
                        Vincular Produto (opcional)
                    </label>
                    <select
                        className="w-full p-2.5 rounded-lg border border-slate-200 bg-white outline-none transition-all focus:border-[#2082B1] focus:ring-1 focus:ring-[#2082B1]/10"
                        value={transaction.productId ?? ""}
                        onChange={(e) =>
                            setTransaction({
                                ...transaction,
                                productId: e.target.value || undefined,
                            })
                        }
                    >
                        <option value="">Selecione um produto</option>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Quantidade */}
                {transaction.productId && (
                    <Input
                        label="Quantidade"
                        type="number"
                        min="1"
                        value={transaction.quantity ?? 0}
                        onChange={(e) =>
                            setTransaction({
                                ...transaction,
                                quantity: Number(e.target.value),
                            })
                        }
                    />
                )}

                {/* Valor */}
                <Input
                    label="Valor (R$)"
                    type="number"
                    placeholder="0,00"
                    min="0"
                    step="0.01"
                    value={transaction.amount}
                    onChange={(e) =>
                        setTransaction({
                            ...transaction,
                            amount: Number(e.target.value),
                        })
                    }
                    required
                />

                {/* Descrição */}
                <Input
                    label="Descrição"
                    type="text"
                    placeholder="Ex: Venda #1235 - Cliente XYZ"
                    value={transaction.description}
                    onChange={(e) =>
                        setTransaction({
                            ...transaction,
                            description: e.target.value,
                        })
                    }
                    required
                />

                {/* Categoria */}
                <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-sm font-medium text-slate-700">
                        Categoria
                    </label>
                    <select
                        className="w-full p-2.5 rounded-lg border border-slate-200 bg-white outline-none transition-all focus:border-[#2082B1] focus:ring-1 focus:ring-[#2082B1]/10"
                        value={transaction.category}
                        onChange={(e) =>
                            setTransaction({
                                ...transaction,
                                category: e.target.value as TransactionFormState["category"],
                            })
                        }
                    >
                        {TRANSACTION_CATEGORIES.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Data */}
                <Input
                    label="Data"
                    type="date"
                    value={transaction.date}
                    onChange={(e) =>
                        setTransaction({
                            ...transaction,
                            date: e.target.value,
                        })
                    }
                    required
                />
            </div>

            <div className="flex justify-end gap-3 mt-8">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 rounded-lg border hover:cursor-pointer border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 rounded-lg text-white font-medium bg-[#2082B1] hover:bg-[#1a6a8f] hover:cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Registrando..." : "Registrar Transação"}
                </button>
            </div>
        </form>
    );
}
