import { useEffect, useState, type FormEvent } from "react";
import Input from "./input";
import { PostProducts, UpdateProducts, type Product } from "@/services/products";

type ProductFormProps = {
    onClose?: () => void;
    onCreated?: () => void;
    initialProduct?: Product | null;
    submitText?: string;
};

type ProductFormState = {
    name: string;
    category: string;
    price: number;
    stock: number;
    available: boolean;
};

function getInitialProductState(product?: Product | null): ProductFormState {
    return {
        name: product?.name ?? "",
        category: product?.category ?? "",
        price: Number(product?.price ?? 0),
        stock: Number(product?.stock ?? 0),
        available: product?.available ?? true,
    };
}

export default function ProductForm({
    onClose,
    onCreated,
    initialProduct,
    submitText,
}: ProductFormProps) {
    const [product, setProduct] = useState<ProductFormState>(
        getInitialProductState(initialProduct),
    );

    useEffect(() => {
        setProduct(getInitialProductState(initialProduct));
    }, [initialProduct]);

    const handleSubmitProduct = async (e: FormEvent) => {
        e.preventDefault();

        const saved = initialProduct
            ? await UpdateProducts(
                initialProduct.id,
                product.name,
                product.price,
                product.stock,
                product.available,
                product.category,
            )
            : await PostProducts(
                product.name,
                product.price,
                product.stock,
                product.available,
                product.category,
            );

        if (saved) {
            onCreated?.();
            onClose?.();
        }
    };

    return (
        <form onSubmit={handleSubmitProduct}>
            <div className="grid grid-cols-2 gap-5">
                <Input
                    label="Nome do Produto"
                    placeholder="Ex: Produto Premium A"
                    value={product.name}
                    onChange={(e) =>
                        setProduct({ ...product, name: e.target.value })
                    }
                />

                <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-sm font-medium text-slate-700">Categoria</label>
                    <select
                        className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 outline-none transition-all focus:border-[#2082B1] focus:ring-1 focus:ring-[#2082B1]/10"
                        value={product.category}
                        onChange={(e) =>
                            setProduct({ ...product, category: e.target.value })
                        }
                    >
                        <option value="" disabled>
                            Selecione
                        </option>
                        <option value="kit">Kit</option>
                        <option value="eletrônico">Eletrônico</option>
                        <option value="serviço">Serviço</option>
                        <option value="acessório">Acessório</option>
                        <option value="outro">Outro</option>
                    </select>
                </div>

                <Input
                    label="Preco (R$)"
                    type="number"
                    value={product.price}
                    onChange={(e) =>
                        setProduct({ ...product, price: Number(e.target.value) })
                    }
                />

                <Input
                    label="Estoque"
                    type="number"
                    value={product.stock}
                    onChange={(e) =>
                        setProduct({ ...product, stock: Number(e.target.value) })
                    }
                />
            </div>
            <div className="mt-5 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Status</label>
                <select
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 outline-none transition-all focus:border-[#2082B1] focus:ring-1 focus:ring-[#2082B1]/10"
                    value={String(product.available)}
                    onChange={(e) =>
                        setProduct({ ...product, available: e.target.value === "true" })
                    }
                >
                    <option value="true">Disponivel</option>
                    <option value="false">Sem Estoque</option>
                </select>
            </div>
            <div className="flex justify-end gap-3 mt-10">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 rounded-lg border hover:cursor-pointer border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 rounded-lg text-white font-medium bg-[#2082B1] hover:bg-[#1a6a8f] hover:cursor-pointer transition-colors"
                >
                    {submitText ?? (initialProduct ? "Salvar" : "Adicionar")}
                </button>
            </div>
        </form>
    );
}