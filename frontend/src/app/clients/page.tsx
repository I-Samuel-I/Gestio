
"use client";
import CreateButton from "@/components/createButton";
import Header from "@/components/header";
import Input from "@/components/input";
import Modal from "@/components/modal";
import Navbar from "@/components/navbar";
import { clients } from "@/mock/client";
import { Filter, Plus, Search, User } from "lucide-react";
import { useState } from "react";

export default function Clients() {

    const [open, setOpen] = useState(false);

    return (
        <main>
            <Navbar />

            <div className="flex flex-col flex-1 md:ml-50 lg:ml-70">
                <Header title="Clientes" />

                <div className="p-8 space-y-6">
                    {/* Hero section */}
                    <section className="flex  flex-col sm:flex-row  justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">Cliente</h1>
                            <p className="text-slate-500">Gerencie sua base de clientes.</p>
                        </div>
                        <button onClick={() => setOpen(true)}
                            className="flex w-full mt-5 justify-center sm:mt-0 sm:w-fit items-center gap-2 bg-[#2082B1] hover:bg-[#1a6a8f] hover:cursor-pointer 
                        text-white font-bold p-3 rounded-lg transition-colors">
                            <Plus className="w-5 h-5" />
                            Novo Cliente
                        </button>
                        <Modal isOpen={open} onClose={() => setOpen(false)}>
                            <CreateButton
                                icon={<User size={45} color="#2082B1" />}
                                type="client"
                                title="Novo Cliente"
                                subTitle="Adicione um novo cliente à sua base"
                                onClose={() => setOpen(false)}
                            />
                        </Modal>
                    </section>

                    {/* Filter */}
                    <section className="flex flex-col  sm:flex-row gap-4">
                        <Input
                            type="text"
                            placeholder="Buscar por nome/email..."
                            icon={Search}
                        />
                        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 transition-all font-medium">
                            <Filter className="w-4 h-4" />
                            Filtros
                        </button>
                    </section>
                    {/* Table  Clients */}
                    <section>
                        {clients.map((client) => (
                            <div key={client.id}>

                                <table className="w-full text-left border-collapse mt-5 bg-white rounded-lg shadow-sm">

                                    <tr className="border">
                                        <th>Nome</th>
                                        <th>Contato</th>
                                        <th>Localização</th>
                                        <th>Status</th>
                                        <th>Total Compras</th>
                                    </tr>
                                    <tr className="border">
                                        <td>{client.nome}</td>
                                        <td>{client.email} <br />{client.celular}</td>
                                        <td>{client.localizacao}</td>
                                        <td>{client.status}</td>
                                        <td>{client.totalCompras}</td>
                                    </tr>
                                </table>

                            </div>
                        ))}
                    </section>
                </div>


            </div>
        </main>
    )
}