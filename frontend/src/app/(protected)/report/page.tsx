"use client";

import Header from "@/components/header";
import Navbar from "@/components/sidebar";
import StatCard from "@/components/statCard";
import { report } from "@/mock/report";
import { DollarSign, File, Package, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const reportCards = [
  {
    title: "Relatorio de Vendas",
    description: report.salesReport,
    footer: "Resumo das vendas por periodo",
    icon: TrendingUp,
    iconColor: "#0A76A9",
    iconBg: "#E6F1F6",
  },
  {
    title: "Relatorio de Clientes",
    description: report.clientsReport,
    footer: "Resumo dos clientes por periodo",
    icon: Users,
    iconColor: "#3ACB6F",
    iconBg: "#E8F9EE",
  },
  {
    title: "Relatorio de Estoque",
    description: report.stockReport,
    footer: "Resumo do estoque por periodo",
    icon: Package,
    iconColor: "#F59F0A",
    iconBg: "#FDF5E6",
  },
  {
    title: "Relatorio Financeiro",
    description: report.financeReport,
    footer: "Resumo do financeiro por periodo",
    icon: DollarSign,
    iconColor: "#AF57DB",
    iconBg: "#F7EEFB",
  },
];

export default function Report() {
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
        <Header title="Relatorios" onMenuClick={() => setNavMobile(true)} />

        <div className="space-y-6 p-6 md:p-8">
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h1 className="text-2xl font-bold text-slate-800">Relatorios</h1>
            <p className="text-slate-500">Gere e visualize seus relatorios</p>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              {reportCards.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + index * 0.08, duration: 0.45 }}
                  >
                    <StatCard>
                      <div className="relative flex gap-5">
                        <div
                          className="flex max-h-13 items-center rounded-xl p-3"
                          style={{ backgroundColor: item.iconBg }}
                        >
                          <Icon color={item.iconColor} size={26} />
                        </div>

                        <div className="mb-2 pr-20">
                          <div>
                            <h2 className="text-xl font-bold text-slate-800">
                              {item.title}
                            </h2>
                            <p className="mt-1 font-light text-slate-500">
                              {item.description}
                            </p>
                          </div>
                          <p className="mt-5 text-sm font-light text-slate-500">
                            {item.footer}
                          </p>
                        </div>

                        <button className="absolute bottom-0 right-0 flex cursor-pointer gap-2 rounded-lg border border-slate-300 p-2 text-slate-800 transition-colors hover:border-[#0A76A9] hover:bg-[#E6F1F6] hover:text-[#0A76A9]">
                          <File color="#0A76A9" size={20} />
                          <h3 className="text-sm">Gerar</h3>
                        </button>
                      </div>
                    </StatCard>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        </div>
      </div>
    </motion.main>
  );
}
