"use client";

import CreateButton from "@/components/createButton";
import Header from "@/components/header";
import Input from "@/components/input";
import Modal from "@/components/modal";
import Navbar from "@/components/navbar";
import { users } from "@/mock/user";
import { Filter, Mail, Plus, Search, Shield, User } from "lucide-react";
import { useState } from "react";


type Roles = "Supervisor" | "Financeiro" | "Gerente" | "Vendas" | "Suporte"

type Status = "Ativo" | "Inativo";


const statusColor: Record<Status, string> = {
    Ativo: "bg-green-100 text-green-700",
    Inativo: "bg-red-100 text-red-700",
};
const rolesColor: Record<Roles, string> = {
    Supervisor: "bg-red-100 text-red-700 border-1 border-[#F5C2C2]",
    Financeiro: "bg-purple-100 text-purple-700 border border-[#E8D0F4]",
    Gerente: "bg-blue-100 text-blue-700 border border-[#BAD8E6]",
    Vendas: "bg-green-100 text-green-700 border border-[#C0EED1]",
    Suporte: "bg-orange-100 text-orange-700 border border-[#FBE4BA]",
};

export default function Users() {

    const [open, setOpen] = useState(false);

    return (
        <main>
            <Navbar />
            <div className="flex flex-col flex-1 md:ml-50 lg:ml-70">
                <Header title="Usuários" />
                <div className="p-6 md:p-8 space-y-6">
                    <section className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">Usuários</h1>
                            <p className="text-slate-500">
                                Gerencie seus usuários.
                            </p>
                        </div>
                        <button
                            onClick={() => setOpen(true)}
                            className="flex w-full sm:w-fit items-center justify-center gap-2 bg-[#2082B1]
                    hover:bg-[#1a6a8f] text-white font-bold p-3 rounded-lg transition"
                        >
                            <Plus className="w-5 h-5" />
                            Novo Usuário
                        </button>
                        <Modal isOpen={open} onClose={() => setOpen(false)}>
                            <CreateButton
                                icon={<User size={45} color="#2082B1" />}
                                type="user"
                                title="Novo Usuário"
                                subTitle="Adicione um novo usuário à sua base"
                                onClose={() => setOpen(false)}
                            />
                        </Modal>
                    </section>

                    {/* Filter */}
                    <section className="flex flex-col sm:flex-row gap-4">
                        <Input
                            type="text"
                            placeholder="Buscar por nome/email..."
                            icon={Search}
                        />

                        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 transition font-medium">
                            <Filter className="w-4 h-4" />
                            Filtros
                        </button>
                    </section>

                    {/* ================== DESKTOP / TABLET ================== */}
                    <section className="hidden md:block bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                        <div className="w-full overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                                        <th className="p-4">Usuário</th>
                                        <th className="p-4">Função</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Último Acesso</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-slate-50 transition">
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <p className="font-medium">{user.name}</p>
                                                    <span className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                                                        <Mail size={14} />
                                                        <p>{user.email}</p>
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`flex items-center gap-2 w-fit px-4 rounded-2xl text-sm font-medium 
                                                     ${rolesColor[user.role as Roles]}`}>
                                                    <Shield size={16} />
                                                    <p className="font-medium">{user.role}</p>
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span
                                                    className={`px-2 py-1 rounded text-sm font-medium ${statusColor[user.status as Status]}`}>
                                                    {user.status}
                                                </span>
                                            </td>

                                            <td className="p-4">
                                                <p className="text-slate-500">{user.last_access}</p>
                                            </td>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* ================== MOBILE ================== */}
                    <section className="grid grid-cols-1 gap-4 md:hidden">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                className="bg-white rounded-xl shadow-sm p-4 space-y-3"
                            >
                                <div>
                                    <p className="font-semibold text-slate-800">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        ID: {user.id}
                                    </p>
                                    <span className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                                        <Mail size={14} />
                                        <p>{user.email}</p>
                                    </span>
                                </div>
                                <div>
                                    <h2>Status:</h2>
                                    <div className="flex gap-2 mt-1">
                                        <span className={`flex items-center gap-2 w-fit px-4 rounded-2xl text-sm font-medium 
                                    ${rolesColor[user.role as Roles]}`}>
                                            <Shield size={16} />
                                            <p className="font-medium">{user.role}</p>
                                        </span>
                                        <span
                                            className={`px-2 py-1 rounded text-sm font-medium ${statusColor[user.status as Status]}`}>
                                            {user.status}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <h2>Último Acesso:</h2>
                                    <p className="text-slate-500">{user.last_access}</p>
                                </div>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </main>
    )
}