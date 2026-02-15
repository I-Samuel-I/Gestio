"use client";

import CreateButton from "@/components/createButton";
import Header from "@/components/header";
import Input from "@/components/input";
import Modal from "@/components/modal";
import Navbar from "@/components/navbar";
import { clients } from "@/mock/client";
import {
  Filter,
  Mail,
  MapPin,
  Phone,
  Plus,
  Search,
  User,
} from "lucide-react";
import { useState } from "react";

export default function Clients() {
  const [open, setOpen] = useState(false);

  type Status = "ativo" | "pendente" | "inativo";

  const statusColor: Record<Status, string> = {
    ativo: "bg-green-100 text-green-700",
    pendente: "bg-yellow-100 text-yellow-700",
    inativo: "bg-red-100 text-red-700",
  };

  return (
    <main>
      <Navbar />

      <div className="flex flex-col flex-1 md:ml-50 lg:ml-70">
        <Header title="Clientes" />

        <div className="p-6 md:p-8 space-y-6">

          {/* Hero */}
          <section className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Clientes</h1>
              <p className="text-slate-500">
                Gerencie sua base de clientes.
              </p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="flex w-full sm:w-fit items-center justify-center gap-2 bg-[#2082B1]
              hover:bg-[#1a6a8f] text-white font-bold p-3 rounded-lg transition"
            >
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

          {/* Filtro */}
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
                    <th className="p-4">Cliente</th>
                    <th className="p-4">Contato</th>
                    <th className="p-4">Localização</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Total Compras</th>
                  </tr>
                </thead>

                <tbody>
                  {clients.map((client) => (
                    <tr
                      key={client.id}
                      className="hover:bg-slate-50 transition"
                    >
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {client.nome}
                          </span>
                          <span className="text-sm text-slate-500">
                            ID: {client.id}
                          </span>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <span className="flex items-center gap-2">
                            <Mail size={16} />
                            {client.email}
                          </span>
                          <span className="flex items-center gap-2 text-sm text-slate-500">
                            <Phone size={16} />
                            {client.celular}
                          </span>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="flex items-center gap-2">
                          <MapPin size={16} />
                          {client.localizacao}
                        </span>
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded text-sm font-medium ${statusColor[client.status as Status]
                            }`}
                        >
                          {client.status}
                        </span>
                      </td>

                      <td className="p-4 font-medium">
                        R$ {client.totalCompras}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ================== MOBILE ================== */}
          <section className="grid grid-cols-1 gap-4 md:hidden">
            {clients.map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-xl shadow-sm p-4 space-y-3"
              >
                {/* Main Data */}
                <div>
                  <p className="font-semibold text-slate-800">
                    {client.nome}
                  </p>
                  <p className="text-xs text-slate-500">
                    ID: {client.id}
                  </p>
                </div>
                {/* Info Clients */}
                <div className="space-y-1 text-sm">
                  <span className="flex items-center gap-2">
                    <Mail size={14} />
                    {client.email}
                  </span>
                  <span className="flex items-center gap-2 text-slate-500">
                    <Phone size={14} />
                    {client.celular}
                  </span>
                </div>

                {/* Location */}
                <div>
                  <span className="flex items-center gap-2 text-sm">
                    <MapPin size={14} />
                    {client.localizacao}
                  </span>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${statusColor[client.status as Status]
                      }`}
                  >
                    {client.status}
                  </span>
                  
                  <span className="font-semibold">
                    R$ {client.totalCompras}
                  </span>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
