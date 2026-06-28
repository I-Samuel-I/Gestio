"use client";

import type { Client } from "@/services/clients";
import type { Product } from "@/services/products";
import type { User } from "@/services/users";
import { X } from "lucide-react";
import ClientsForm from "./clientsForm";
import ProductForm from "./productForm";
import UsersForm from "./usersForm";
import FinanceForm from "./financeForm";

type BaseCreateProps = {
    title: string;
    subTitle: string;
    icon?: React.ReactNode;
    onClose: () => void;
    onCreated?: () => void;
};

type CreateModalProps =
    | (BaseCreateProps & {
        type: "product";
        product?: Product | null;
        submitText?: string;
    })
    | (BaseCreateProps & {
        type: "client";
        client?: Client | null;
        submitText?: string;
    })
    | (BaseCreateProps & {
        type: "user";
        user?: User | null;
        submitText?: string;
    })
    | (BaseCreateProps & { type: "finance" });

export default function ModalForm(props: CreateModalProps) {
    const { title, subTitle, icon, type, onClose, onCreated } = props;

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
                <ProductForm
                    onClose={onClose}
                    onCreated={onCreated}
                    initialProduct={props.product}
                    submitText={props.submitText}
                />
            )}
            {type === "client" && (
                <ClientsForm
                    onClose={onClose}
                    onCreated={onCreated}
                    initialClient={props.client}
                    submitText={props.submitText}
                />
            )}
            {type === "user" && (
                <UsersForm
                    onClose={onClose}
                    onCreated={onCreated}
                    initialUser={props.user}
                    submitText={props.submitText}
                />
            )}
            {type === "finance" && (
                <FinanceForm onClose={onClose} onCreated={onCreated} />
            )}
        </div>
    );
}