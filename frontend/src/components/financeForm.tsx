"use client";

import { useEffect, useState, type FormEvent } from "react";
import Input from "./input";
import { PostTransaction } from "@/services/transactions";
import { GetProducts, type Product } from "@/services/products";

type FinanceFormProps = {
  onClose?: () => void;
  onCreated?: () => void;
};

type TransactionFormState = {
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
  const today = new Date().toISOString().split("T")[0];

  return {
    type: "entrada",
    amount: 0,
    description: "",
    category: "vendas",
    date: today,
  };
}

export default function FinanceForm({ onClose, onCreated }: FinanceFormProps) {
  const [transaction, setTransaction] = useState<TransactionFormState>(
    getInitialTransactionState(),
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const selectedProduct = products.find(
    (product) => String(product.id) === transaction.productId,
  );

  useEffect(() => {
    const loadProducts = async () => {
      const data = await GetProducts();
      setProducts(data ?? []);
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (transaction.type !== "entrada" || !selectedProduct) {
      return;
    }

    const quantity =
      transaction.quantity && transaction.quantity > 0 ? transaction.quantity : 1;

    setTransaction((prev) => ({
      ...prev,
      quantity,
      amount: Number(selectedProduct.price) * quantity,
    }));
  }, [selectedProduct, transaction.quantity, transaction.type]);

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
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Tipo
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() =>
                setTransaction((prev) => ({
                  ...prev,
                  type: "entrada",
                }))
              }
              className={`flex-1 rounded-lg px-4 py-2.5 font-medium transition-all ${
                transaction.type === "entrada"
                  ? "bg-green-500 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Entrada
            </button>
            <button
              type="button"
              onClick={() =>
                setTransaction((prev) => ({
                  ...prev,
                  type: "saída",
                  productId: undefined,
                  quantity: undefined,
                }))
              }
              className={`flex-1 rounded-lg px-4 py-2.5 font-medium transition-all ${
                transaction.type === "saída"
                  ? "bg-red-500 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Saída
            </button>
          </div>
        </div>

        <div className="flex w-full flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">
            Vincular Produto (opcional)
          </label>
          <select
            className="w-full rounded-lg border border-slate-200 bg-white p-2.5 outline-none transition-all focus:border-[#2082B1] focus:ring-1 focus:ring-[#2082B1]/10"
            value={transaction.productId ?? ""}
            onChange={(e) => {
              const productId = e.target.value || undefined;
              const product = products.find(
                (item) => String(item.id) === productId,
              );
              const quantity =
                productId && transaction.type === "entrada"
                  ? transaction.quantity ?? 1
                  : transaction.quantity;

              setTransaction((prev) => ({
                ...prev,
                productId,
                quantity: productId ? quantity : undefined,
                amount:
                  productId && transaction.type === "entrada"
                    ? Number(product?.price ?? 0) * (quantity ?? 1)
                    : prev.amount,
              }));
            }}
          >
            <option value="">Selecione um produto</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        {transaction.productId && (
          <Input
            label="Quantidade"
            type="number"
            min="1"
            value={transaction.quantity ?? 1}
            onChange={(e) =>
              setTransaction({
                ...transaction,
                quantity: Number(e.target.value),
              })
            }
          />
        )}

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
          disabled={transaction.type === "entrada" && !!transaction.productId}
          required
        />

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

        <div className="flex w-full flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">Categoria</label>
          <select
            className="w-full rounded-lg border border-slate-200 bg-white p-2.5 outline-none transition-all focus:border-[#2082B1] focus:ring-1 focus:ring-[#2082B1]/10"
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

      <div className="mt-8 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-slate-200 px-6 py-2 font-medium text-slate-700 transition-colors hover:cursor-pointer hover:bg-slate-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-[#2082B1] px-6 py-2 font-medium text-white transition-colors hover:cursor-pointer hover:bg-[#1a6a8f] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Registrando..." : "Registrar Transação"}
        </button>
      </div>
    </form>
  );
}
