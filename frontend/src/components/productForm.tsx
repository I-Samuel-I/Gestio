import { useState, type FormEvent } from "react";
import Input from "./input";
import { PostProducts } from "@/services/products";

type ProductFormProps = {
    onClose?: () => void;
    onCreated?: () => void;
};

export default function ProductForm({ onClose, onCreated }: ProductFormProps) {

    const [product, setProduct] = useState({
        name: "",
        category: "",
        price: 0,
        stock: 0,
        available: true,
    });

    
    const addProduct = async (e: FormEvent) => {
        e.preventDefault();
        const created = await PostProducts(
            product.name,
            product.price,
            product.stock,
            product.available,
            product.category,
        );
        if (created) {
            onCreated?.();
            onClose?.();
        }
    }

    return (
        <form onSubmit={addProduct}>
            <div className="grid grid-cols-2 gap-5">
                <Input
                    label="Nome do Produto"
                    placeholder="Ex: Produto Premium A"
                    value={product.name}
                    onChange={(e) =>
                        setProduct({ ...product, name: e.target.value })
                    }
                />
                <div>
                    <label >Categoria</label>
                    <select
                        className="w-full mt-1 p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={product.category}
                        onChange={(e) =>
                            setProduct({ ...product, category: e.target.value })
                        }
                    >
                        <option value="kit">Kit</option>
                        <option value="eletronic">Eletrônico</option>
                        <option value="service">Serviço</option>
                        <option value="acessory">Acessório</option>
                        <option value="other">Outro</option>
                    </select>

                </div>


                <Input
                    label="Preço (R$)"
                    type="number"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                />

                <Input
                    label="Estoque"
                    type="number"
                    value={product.stock}
                    onChange={(e) => setProduct({ ...product, stock: Number(e.target.value) })}
                />
            </div>
            <div className="mt-5">
               <label >Status</label>
                    <select
                        className="w-full mt-1 p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={String(product.available)}
                        onChange={(e) =>
                            setProduct({ ...product, available: e.target.value === "true" })
                        }
                    >
                        <option value="true">Disponível</option>
                        <option value="false">Sem Estoque</option>
                
                    </select>
            </div>
            <div className="flex justify-end gap-3 mt-10">
                <button
                   
                    className="px-6 py-2 rounded-lg border hover:cursor-pointer border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                >
                    Cancelar
                </button>
                <button

                    className="px-6 py-2 rounded-lg  text-white font-medium bg-[#2082B1] hover:bg-[#1a6a8f] hover:cursor-pointer transition-colors"
                >
                    Adicionar
                </button>
            </div>
        </form>
    )
}
