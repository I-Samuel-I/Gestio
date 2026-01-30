"use client";

import { useState } from "react";
import Input from "./input";
import { X } from "lucide-react";

type BaseCreateProps = {
    title: string;
    subTitle: string;
    icon?: React.ReactNode;
    onClose: () => void;
};


type CreateModalProps =
    | (BaseCreateProps & { type: "product" })
    | (BaseCreateProps & { type: "client" })
    | (BaseCreateProps & { type: "user" });

export default function CreateButton(props: CreateModalProps) {
    const { title, subTitle, icon, type, onClose } = props;
    const [product, setProduct] = useState({
        name: "",
        category: "",
        price: 0,
        stock: 0,
        status: ""
    })
    const [client, setClient] = useState({
        name: "",
        email: "",
        phone: "",
        cpf: "",
        address: "",
        city: "",
        state: "",
    });
    const [user, setUser] = useState({
        name: "",
        password: "",
        confirmPassword: "",
        role: "",
    });


    return (
        <div className="p-5 relative">
            <header className="flex items-center gap-4 mb-8">
                <div className="bg-sky-50 p-3 rounded-xl text-sky-600">
                    {icon}
                </div>
                <div>
                    <h1 className="text-xl font-bold text-slate-800">{title}</h1>
                    <p className="text-sm text-slate-500">{subTitle}</p>
                </div>
                <button
                    className="absolute top-6 right-5 text-slate-400 hover:cursor-pointer hover:text-slate-600 transition-all"
                    onClick={onClose}
                >
                    <X size={26} />
                </button>
            </header>

            {/* Page products */}
            {type === "product" && (
                <>
                    <div className="grid grid-cols-2 gap-5">
                        <Input
                            label="Nome do Produto"
                            placeholder="Ex: Produto Premium A"
                            value={product.name}
                            onChange={(e) =>
                                setProduct({ ...product, name: e.target.value })
                            }
                        />

                        <Input
                            label="Categoria"
                            type="select"
                            placeholder="Selecione"
                            value={product.category}
                        />

                        <Input
                            label="Preço (R$)"
                            type="number"
                            value={product.price}
                        />

                        <Input
                            label="Estoque"
                            type="number"
                            value={product.stock}
                        />
                    </div>
                </>
            )}

            {props.type === "client" && (
                <div>
                    <div className="grid grid-cols-2 gap-5">
                        <Input
                            label="Nome Completo"
                            placeholder="Ex: Maria Silva"
                            value={client.name}
                            onChange={(e) =>
                                setClient({ ...client, name: e.target.value })
                            }
                        />

                        <Input
                            label="Email"
                            type="text"
                            placeholder="email@exemplo.com"
                            value={client.email}
                            onChange={(e) => setClient({ ...client, email: e.target.value })}
                        />

                        <Input
                            label="Telefone"
                            type="number"
                            placeholder="(11) 9 9999-9999"
                            value={client.phone}
                            onChange={(e) => setClient({ ...client, phone: e.target.value })}
                        />

                        <Input
                            label="Endereço"
                            type="number"
                            value={client.address}
                            onChange={(e) => setClient({ ...client, address: e.target.value })}
                        />
                        <Input
                            label="Cidade"
                            type="text"
                            value={client.city}
                            onChange={(e) => setClient({ ...client, city: e.target.value })}
                        />
                        <Input
                            label="Estado"
                            type="text"
                            value={client.state}
                            onChange={(e) => setClient({ ...client, state: e.target.value })}
                        />
                        <Input
                            label="Status"
                            type="select"
                            placeholder="Selecione"
                        />
                    </div>
                </div>
            )}
            {props.type === "user" && (

                <div>

                </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-10">
                <button
                    onClick={onClose}
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
        </div>
    )
}