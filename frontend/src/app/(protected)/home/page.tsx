"use client";

import Header from "@/components/header";
import Navbar from "@/components/sidebar";
import { ArrowRight, Building2, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
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
        <Header title="Inicio" onMenuClick={() => setNavMobile(true)} />

        <div className="space-y-6 p-6 md:p-8">
          <motion.section
            className="overflow-hidden rounded-[28px] bg-gradient-to-br from-[#2082B1] via-[#2C8FBF] to-[#79B6D2] p-8 text-white shadow-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl space-y-4">
                <div className="flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur-sm">
                  <Sparkles size={16} />
                  Painel principal do GestIO
                </div>
                <div className="space-y-3">
                  <h1 className="text-3xl font-bold leading-tight md:text-5xl">
                    Tudo pronto para seguir com clientes, produtos e operacoes.
                  </h1>
                  <p className="max-w-xl text-sm text-blue-50 md:text-base">
                    Use o menu lateral para navegar entre os modulos e acompanhar
                    o seu negocio em um unico fluxo.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  href="/products"
                  className="group rounded-2xl bg-white/15 p-4 backdrop-blur-sm transition hover:bg-white/20"
                >
                  <div className="flex items-center justify-between">
                    <Building2 size={20} />
                    <ArrowRight
                      size={18}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                  <p className="mt-6 text-lg font-semibold">Ir para Produtos</p>
                  <p className="mt-1 text-sm text-blue-50">
                    Gerencie catalogo e estoque.
                  </p>
                </Link>

                <Link
                  href="/clients"
                  className="group rounded-2xl bg-white/15 p-4 backdrop-blur-sm transition hover:bg-white/20"
                >
                  <div className="flex items-center justify-between">
                    <Building2 size={20} />
                    <ArrowRight
                      size={18}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                  <p className="mt-6 text-lg font-semibold">Ir para Clientes</p>
                  <p className="mt-1 text-sm text-blue-50">
                    Acompanhe sua base de atendimento.
                  </p>
                </Link>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.main>
  );
}
