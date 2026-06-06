"use client";

import AreaGraph from "@/components/areaChart";
import Header from "@/components/header";
import Navbar from "@/components/sidebar";
import StatCard from "@/components/statCard";
import { dashboard } from "@/mock/dashboard";
import dayjs from "dayjs";
import { Box, DollarSign, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type ActivityCategory = "client" | "product" | "payment";

function activityMeta(category: ActivityCategory) {
  switch (category) {
    case "client":
      return {
        icon: User,
        color: "#0A76A9",
        bgColor: "#E6F1F6",
      };
    case "product":
      return {
        icon: Box,
        color: "#F59F0A",
        bgColor: "#FDF5E6",
      };
    case "payment":
      return {
        icon: DollarSign,
        color: "#21C45D",
        bgColor: "#E8F9EE",
      };
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
    return `${diffDay} dia(s) atras`;
  }

  if (diffMin < 60) {
    return `${diffMin} min atras`;
  }

  if (diffHour < 24) {
    return `${diffHour} hora(s) atras`;
  }

  if (diffMonth > 0) {
    return `${diffMonth} mes(es) atras`;
  }

  return d.format("DD/MM/YYYY");
}

export default function Dashboard() {
  const [navMobile, setNavMobile] = useState(false);

  return (
    <motion.main
      className="flex min-h-screen bg-slate-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Navbar
        mobileOpen={navMobile}
        onClose={() => setNavMobile(false)}
      />

      <div className="flex flex-1 flex-col md:ml-50 lg:ml-70">
        <Header title="Dashboard" onMenuClick={() => setNavMobile(true)} />

        <div className="space-y-6 p-6 md:p-8">
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <StatCard>
                <div className="flex items-center justify-between">
                  <span>
                    <p className="text-slate-500">Total de Clientes</p>
                    <h2 className="mt-2 text-3xl font-bold text-slate-800">
                      {dashboard.header.totalClients}
                    </h2>
                  </span>
                  <div className="rounded-xl bg-[#E6F1F6] p-3">
                    <User color="#0A76A9" />
                  </div>
                </div>
              </StatCard>

              <StatCard>
                <div className="flex items-center justify-between">
                  <span>
                    <p className="text-slate-500">Produtos Ativos</p>
                    <h2 className="mt-2 text-3xl font-bold text-slate-800">
                      {dashboard.header.productsActive}
                    </h2>
                  </span>
                  <div className="rounded-xl bg-[#FDF5E6] p-3">
                    <Box color="#F59F0A" />
                  </div>
                </div>
              </StatCard>

              <StatCard>
                <div className="flex items-center justify-between">
                  <span>
                    <p className="text-slate-500">Receita Mensal</p>
                    <h2 className="mt-2 text-3xl font-bold text-slate-800">
                      R$ {dashboard.header.monthlyRevenue.toLocaleString("pt-BR")}
                    </h2>
                  </span>
                  <div className="rounded-xl bg-[#E8F9EE] p-3">
                    <DollarSign color="#21C45D" />
                  </div>
                </div>
              </StatCard>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex flex-col gap-5 lg:flex-row">
              <AreaGraph />
              <StatCard>
                <h3 className="text-xl font-bold text-slate-800">
                  Produtos Mais Vendidos
                </h3>
                <p className="font-light text-slate-500">
                  Ranking baseado nas transacoes
                </p>
              </StatCard>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="hidden md:block">
              <StatCard>
                <h3 className="text-xl font-bold text-slate-800">
                  Atividades Recentes
                </h3>
                <p className="font-light text-slate-500">
                  Ultimas atualizacoes no sistema
                </p>

                {dashboard.recentActivities.map((activity) => {
                  const meta = activityMeta(activity.category as ActivityCategory);
                  const Icon = meta.icon;

                  return (
                    <div key={activity.id} className="mt-10 flex justify-between">
                      <div className="flex items-center gap-5">
                        <div
                          className="rounded-lg p-2.5"
                          style={{ backgroundColor: meta.bgColor }}
                        >
                          <Icon size={20} color={meta.color} />
                        </div>
                        <div className="flex flex-col">
                          <p>{activity.title}</p>
                          <p className="text-sm text-slate-500">
                            {activity.description}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500">
                        {formatDate(activity.date)}
                      </p>
                    </div>
                  );
                })}
              </StatCard>
            </div>

            <div className="block md:hidden">
              <h3 className="text-xl font-bold text-slate-800">
                Atividades Recentes
              </h3>
              <p className="font-light text-slate-500">
                Ultimas atualizacoes no sistema
              </p>
              <div className="mt-5 flex flex-col gap-5">
                {dashboard.recentActivities.map((activity) => {
                  const meta = activityMeta(activity.category as ActivityCategory);
                  const Icon = meta.icon;

                  return (
                    <StatCard key={activity.id}>
                      <div className="flex items-center gap-5">
                        <div
                          className="rounded-lg p-2.5"
                          style={{ backgroundColor: meta.bgColor }}
                        >
                          <Icon size={24} color={meta.color} />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-sm">{activity.title}</p>
                          <p className="mt-1 text-xs text-slate-500">
                            {activity.description}
                          </p>
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-slate-500">
                        {formatDate(activity.date)}
                      </p>
                    </StatCard>
                  );
                })}
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.main>
  );
}
