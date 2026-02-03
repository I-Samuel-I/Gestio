"use client";

import { X } from "lucide-react";
import ClientForm from "./clientForm";
import ProductForm from "./productForm";

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

            {type === "product" && (
                <><ProductForm />
                </>
            )}
            {type === "client" && (<ClientForm />)}
            {type === "user" && (

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