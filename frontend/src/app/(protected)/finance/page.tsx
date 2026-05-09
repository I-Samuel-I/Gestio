"use client";

import CreateButtonForm from "@/components/createButtonForm";
import Header from "@/components/header";
import LineGraph from "@/components/lineChart";
import Modal from "@/components/modal";
import ModalForm from "@/components/modalForm";
import Navbar from "@/components/sidebar";
import PieGraph from "@/components/pieChart";
import StatCard from "@/components/statCard";
import { finances } from "@/mock/finance";
import {
  ArrowDownRight,
  ArrowUpRight,
  BoxIcon,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type TransactionType = "income" | "expense";

function transactionMeta(type: TransactionType) {
  if (type === "income") {
    return {
      icon: ArrowUpRight,
      color: "#21C462",
      bgColor: "#E8F9EE",
    };
  }

  return {
    icon: ArrowDownRight,
    color: "#DC2874",
    bgColor: "#FBE9E9",
  };
}

export default function Finance() {
  const [open, setOpen] = useState(false);
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
        <Header title="Financeiro" onMenuClick={() => setNavMobile(true)} />

        <div className="space-y-6 p-6 md:p-8">
          <motion.section
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Financeiro</h1>
                <p className="text-slate-500">Controle de entradas e saidas</p>
              </div>

              <CreateButtonForm
                onClick={() => setOpen(true)}
                text="Nova Transacao"
              />
            </div>

            <AnimatePresence>
              {open && (
                <Modal isOpen={open} onClose={() => setOpen(false)}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ModalForm
                      icon={<BoxIcon size={45} color="#2082B1" />}
                      type="finance"
                      title="Nova Transacao"
                      subTitle="Adicione uma nova transacao financeira"
                      onClose={() => setOpen(false)}
                    />
                  </motion.div>
                </Modal>
              )}
            </AnimatePresence>

            <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <StatCard>
                <div className="flex items-center justify-between gap-4">
                  <span>
                    <p className="text-slate-500">Saldo Atual</p>
                    <h2 className="mt-2 break-words text-2xl font-bold text-slate-800 md:text-3xl">
                      R$ {finances.header.currentBalance.toLocaleString("pt-BR")}
                    </h2>
                  </span>
                  <div className="rounded-xl bg-[#E6F1F6] p-3">
                    <Wallet color="#0A76A9" />
                  </div>
                </div>
              </StatCard>

              <StatCard>
                <div className="flex items-center justify-between gap-4">
                  <span>
                    <p className="text-slate-500">Receita do Mes</p>
                    <h2 className="mt-2 break-words text-2xl font-bold text-slate-800 md:text-3xl">
                      R$ {finances.header.expensesMonth.toLocaleString("pt-BR")}
                    </h2>
                  </span>
                  <div className="rounded-xl bg-[#E8F9EE] p-3">
                    <TrendingUp color="#21C45D" />
                  </div>
                </div>
              </StatCard>

              <StatCard>
                <div className="flex items-center justify-between gap-4">
                  <span>
                    <p className="text-slate-500">Despesa do Mes</p>
                    <h2 className="mt-2 break-words text-2xl font-bold text-slate-800 md:text-3xl">
                      R$ {finances.header.accountsReceivable.toLocaleString("pt-BR")}
                    </h2>
                  </span>
                  <div className="rounded-xl bg-[#FDF5E6] p-3">
                    <TrendingDown color="#F5A418" />
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
            <div className="flex flex-col gap-4 lg:flex-row">
              <LineGraph />
              <PieGraph />
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
                  Transacoes recentes
                </h3>
                <p className="font-light text-slate-500">
                  Ultimas movimentacoes financeiras
                </p>

                {finances.transactions.map((transaction) => {
                  const meta = transactionMeta(transaction.type as TransactionType);
                  const Icon = meta.icon;

                  return (
                    <div
                      key={transaction.id}
                      className="mt-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center"
                    >
                      <div className="flex items-center gap-5">
                        <div
                          className="rounded-lg p-2.5"
                          style={{ backgroundColor: meta.bgColor }}
                        >
                          <Icon size={20} color={meta.color} />
                        </div>

                        <div className="flex flex-col">
                          <p>{transaction.title}</p>
                          <p className="text-sm text-slate-500">
                            {new Date(transaction.date).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                      </div>

                      <p className="font-medium sm:text-right" style={{ color: meta.color }}>
                        {transaction.type === "income" ? "+" : "-"}R$
                        {transaction.value.toLocaleString("pt-BR")}
                      </p>
                    </div>
                  );
                })}
              </StatCard>
            </div>

            <div className="md:hidden">
              <h3 className="text-xl font-bold text-slate-800">
                Transacoes recentes
              </h3>
              <p className="font-light text-slate-500">
                Ultimas movimentacoes financeiras
              </p>

              {finances.transactions.map((transaction) => {
                const meta = transactionMeta(transaction.type as TransactionType);
                const Icon = meta.icon;

                return (
                  <div key={transaction.id} className="mt-4">
                    <StatCard>
                      <div className="flex items-center gap-5">
                        <div
                          className="rounded-lg p-2.5"
                          style={{ backgroundColor: meta.bgColor }}
                        >
                          <Icon size={22} color={meta.color} />
                        </div>

                        <div className="flex flex-col">
                          <p>{transaction.title}</p>
                          <div className="mt-1 flex items-center justify-between">
                            <p className="font-medium" style={{ color: meta.color }}>
                              {transaction.type === "income" ? "+" : "-"}R$
                              {transaction.value.toLocaleString("pt-BR")}
                            </p>
                            <p className="text-sm text-slate-500">
                              {new Date(transaction.date).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </StatCard>
                  </div>
                );
              })}
            </div>
          </motion.section>
        </div>
      </div>
    </motion.main>
  );
}
