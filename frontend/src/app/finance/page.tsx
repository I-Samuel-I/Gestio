"use client"

import CreateButton from "@/components/createButton";
import Header from "@/components/header";
import LineGraph from "@/components/lineChart";
import Modal from "@/components/modal";
import Navbar from "@/components/navbar";
import PieGraph from "@/components/pieChart";
import StatCard from "@/components/statCard";
import { finances } from "@/mock/finance";
import { ArrowDownRight, ArrowUpRight, BoxIcon, Plus, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useState } from "react";

type TransactionType = "income" | "expense";

function TransactionMeta(type: TransactionType) {
    if (type === "income") {
        return {
            sign: "+",
            icon: ArrowUpRight,
            color: "#21C462",
            bgColor: "#E8F9EE",
        }
    }
    else {
        return {
            sign: "-",
            icon: ArrowDownRight,
            color: "#DC2874",
            bgColor: "#FBE9E9",
        }
    }
}

export default function Finance() {

    const [open, setOpen] = useState(false);

    return (
        <main className="flex min-h-screen bg-slate-50">
            <Navbar />
            <div className="flex flex-col flex-1 md:ml-50 lg:ml-70">
                <Header title="Financeiro" />

                <div className="p-8 space-y-6">
                    {/* Hero Section */}
                    <section >
                        <div className="flex  flex-col sm:flex-row  justify-between items-start">


                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">Financeiro</h1>
                                <p className="text-slate-500">Controle de entrdas e saídas</p>
                            </div>
                            <button onClick={() => setOpen(true)}
                                className="flex  w-full mt-5 justify-center sm:mt-0 sm:w-fit 
                            items-center gap-2 bg-[#2082B1] hover:bg-[#1a6a8f] hover:cursor-pointer 
                          text-white  p-3 rounded-lg transition-colors">
                                <Plus className="w-5 h-5" />
                                Nova Transação
                            </button>
                            <Modal isOpen={open} onClose={() => setOpen(false)}>
                                <CreateButton
                                    icon={<BoxIcon size={45} color="#2082B1" />}
                                    type="finance"
                                    title="Nova Transação"
                                    subTitle="Adicione uma nova transação financeira"
                                    onClose={() => setOpen(false)}
                                />
                            </Modal>
                        </div>
                        <div className="flex justify-between gap-7 mt-5">
                            <StatCard>
                                <div className="flex justify-between items-center">
                                    <span >
                                        <p className="text-slate-500">Saldo Atual</p>
                                        <h2 className=" text-3xl font-bold mt-2 text-slate-800">R$
                                            {finances.header.currentBalance.toLocaleString("pt-br")}
                                        </h2>
                                    </span>
                                    <div className="bg-[#E6F1F6] p-3 justify-center rounded-xl">
                                        <Wallet color="#0A76A9" />
                                    </div>

                                </div>
                            </StatCard>
                            <StatCard>
                                <div className="flex justify-between items-center">
                                    <span>
                                        <p className="text-slate-500">Receita do Mês</p>
                                        <h2 className=" text-3xl font-bold mt-2 text-slate-800">R$
                                            {finances.header.expensesMonth.toLocaleString("pt-br")}
                                        </h2>
                                    </span>
                                    <div className="bg-[#E8F9EE] p-3 justify-center rounded-xl">
                                        <TrendingUp color="#21C45D" />
                                    </div>

                                </div>
                            </StatCard>
                            <StatCard>
                                <div className="flex justify-between items-center">
                                    <span>
                                        <p className="text-slate-500 text">Despesa do Mês</p>
                                        <h2 className=" text-3xl font-bold mt-2 text-slate-800">R$
                                            {finances.header.accountsReceivable.toLocaleString("pt-br")}
                                        </h2>
                                    </span>
                                    <div className="bg-[#FDF5E6] p-3 justify-center rounded-xl">
                                        <TrendingDown color="#F5A418" />
                                    </div>
                                </div>
                            </StatCard>
                        </div>
                    </section>
                    {/*  Graphs */}
                    <section>
                        <div className="flex flex-col gap-5 lg:flex-row">
                            <LineGraph />
                            <PieGraph />
                        </div>
                    </section>
                    <section>
                        <StatCard>
                            <h3 className="text-xl font-bold text-slate-800">Transações recentes</h3>
                            <p className="text-slate-500 font-light">Últimas movimentações financeiras</p>
                            {finances.transactions.map((transactions) => {
                                const meta = TransactionMeta(transactions.type as TransactionType)
                                const Icon = meta.icon

                                return (
                                    <div key={transactions.id} className="flex justify-between mt-10">
                                        <div className="flex items-center gap-5">

                                            <div className="p-2.5 rounded-lg " style={{ backgroundColor: meta.bgColor }}>
                                                <Icon size={20} color={meta.color} />
                                            </div>
                                            <div className="flex flex-col" 
                                            >
                                                <p>{transactions.title}</p>
                                                <p className="text-sm text-slate-500">{new Date(transactions.date).toLocaleDateString("pt-br")}</p>
                                            </div>
                                        </div>
                                        <p style={{ color: meta.color}} className="font-medium">{transactions.type === "income" ? "+" : "-"}
                                            R${transactions.value.toLocaleString("pt-br")}</p>
                                    </div>
                                )
                            })}
                        </StatCard>
                    </section>
                </div>
            </div>
        </main>
    )
}