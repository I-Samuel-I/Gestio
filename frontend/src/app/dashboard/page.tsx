"use client"

import AreaGraph from "@/components/areaChart";
import Header from "@/components/header";
import Navbar from "@/components/sidebar";
import StatCard from "@/components/statCard";
import { dashboard } from "@/mock/dashboard";
import dayjs from "dayjs";
import { Box, DollarSign, User } from "lucide-react";


export default function Dashboard() {

    type ActivityCategory = "client" | "product" | "payment";

    function ActivityMeta(category: ActivityCategory) {
        switch (category) {
            case "client":
                return {
                    icon: User,
                    color: "#0A76A9",
                    bgColor: "#E6F1F6",
                }
            case "product":
                return {
                    icon: Box,
                    color: "#F59F0A",
                    bgColor: "#FDF5E6",
                }
            case "payment":
                return {
                    icon: DollarSign,
                    color: "#21C45D",
                    bgColor: "#E8F9EE",
                }
        }
    }

    function formatDate(date: string) {
        const d = dayjs(date);
        const now = dayjs();
        const diffMin = now.diff(d, "minute");
        const diffHour = now.diff(d, "hour");
        const diffDay = now.diff(d, "day");
        const diffMonth = now.diff(d, "month");

        if (diffDay > 0) {
            return `${diffDay} dia(s) atrás`;
        }
        if (diffMin < 60) {
            return `${diffMin} min atrás`;
        }
        if (diffHour < 24) {
            return `${diffHour} hora(s) atrás`;
        }
        if (diffMonth > 0) {
            return `${diffMonth} mês(es) atrás`;
        }
        return d.format("DD/MM/YYYY");

    }

    return (
        <main className="flex min-h-screen bg-slate-50">
            <Navbar />
            <div className="flex flex-col flex-1 md:ml-50 lg:ml-70">
                <Header title="Dashboard" />

                {/* Hero Section */}
                <div className="p-8 space-y-6">
                    <section >
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-5">
                            <StatCard>
                                <div className="flex justify-between items-center">
                                    <span >
                                        <p className="text-slate-500">Total de Clientes</p>
                                        <h2 className=" text-3xl font-bold mt-2 text-slate-800">
                                            {dashboard.header.totalClients}
                                        </h2>
                                    </span>
                                    <div className="bg-[#E6F1F6] p-3 justify-center rounded-xl">
                                        <User color="#0A76A9" />
                                    </div>

                                </div>
                            </StatCard>
                            <StatCard>
                                <div className="flex justify-between items-center">
                                    <span >
                                        <p className="text-slate-500">Produtos Ativos</p>
                                        <h2 className=" text-3xl font-bold mt-2 text-slate-800">
                                            {dashboard.header.productsActive}
                                        </h2>
                                    </span>
                                    <div className="bg-[#FDF5E6] p-3 justify-center rounded-xl">
                                        <Box color="#F59F0A" />
                                    </div>

                                </div>
                            </StatCard>
                            <StatCard>
                                <div className="flex justify-between items-center">
                                    <span >
                                        <p className="text-slate-500">Receita Mensal</p>
                                        <h2 className=" text-3xl font-bold mt-2 text-slate-800">
                                            R$ {dashboard.header.monthlyRevenue.toLocaleString('pt-BR')}
                                        </h2>
                                    </span>
                                    <div className="bg-[#E8F9EE] p-3 justify-center rounded-xl">
                                        <DollarSign color="#21C45D" />
                                    </div>

                                </div>
                            </StatCard>

                        </div>
                    </section>
                    <section>
                        <div className="flex flex-col gap-5 lg:flex-row">
                            <AreaGraph />
                            <StatCard>
                                <h3 className="text-xl font-bold text-slate-800">Produtos Mais Vendidos</h3>
                                <p className="text-slate-500 font-light">Ranking baseado nas transações</p>
                                
                            </StatCard>
                        </div>

                    </section>

                    <section>
                        {/* DESKTOP/TABLET */}
                        <div className="hidden md:block">


                            <StatCard>
                                <h3 className="text-xl font-bold text-slate-800">Atividades Recentes</h3>
                                <p className="text-slate-500 font-light">Últimas atualizações no sistema</p>
                                {dashboard.recentActivities.map((activie) => {
                                    const meta = ActivityMeta(activie.category as ActivityCategory)
                                    const Icon = meta.icon

                                    return (
                                        <div key={activie.id} className="flex justify-between mt-10">
                                            <div className="flex items-center gap-5">

                                                <div className="p-2.5 rounded-lg " style={{ backgroundColor: meta.bgColor }}>
                                                    <Icon size={20} color={meta.color} />
                                                </div>
                                                <div className="flex flex-col"
                                                >
                                                    <p>{activie.title}</p>
                                                    <p className="text-sm text-slate-500">{activie.description}</p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-slate-500">{formatDate(activie.date)}</p>
                                        </div>
                                    )
                                })}
                            </StatCard>
                        </div>
                        {/* MOBILE */}
                        <div className="block md:hidden">

                            <h3 className="text-xl font-bold text-slate-800">Atividades Recentes</h3>
                            <p className="text-slate-500 font-light">Últimas atualizações no sistema</p>
                            <div className="flex flex-col gap-5 mt-5">

                            
                            {dashboard.recentActivities.map((activie) => {
                                const meta = ActivityMeta(activie.category as ActivityCategory)
                                const Icon = meta.icon

                                return (
                                    <StatCard key={activie.id} >
                                        <div className="flex items-center gap-5">

                                            <div className="p-2.5 rounded-lg " style={{ backgroundColor: meta.bgColor }}>
                                                <Icon size={24} color={meta.color} />
                                            </div>
                                            <div className="flex flex-col"
                                            >
                                                <p className="text-sm">{activie.title}</p>
                                                <p className="text-xs mt-1 text-slate-500">{activie.description}</p>
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-2">{formatDate(activie.date)}</p>
                                    </StatCard>
                                )
                            })}
                            </div>
                        </div>
                    </section>
                </div>
            </div >
        </main >
    )
}