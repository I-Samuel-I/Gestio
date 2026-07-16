"use client";

import Header from "@/components/header";
import Navbar from "@/components/sidebar";
import StatCard from "@/components/statCard";
import {
  DownloadReportCustomersPdf,
  DownloadReportFinancialPdf,
  DownloadReportSalesPdf,
  DownloadReportStockPdf,
  GetReportCustomers,
  GetReportFinancial,
  GetReportSales,
  GetReportStock,
} from "@/services/report";
import { Clock, DollarSign, File, Package, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

type ReportHistoryItem = {
  id: string;
  title: string;
  fileName: string;
  generatedAt: string;
};

const REPORT_HISTORY_STORAGE_KEY = "gestio_report_history";

function formatGeneratedAt(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(date));
}

export default function Report() {
  const [navMobile, setNavMobile] = useState(false);
  const [salesDescription, setSalesDescription] = useState("");
  const [customersDescription, setCustomersDescription] = useState("");
  const [stockDescription, setStockDescription] = useState("");
  const [financialDescription, setFinancialDescription] = useState("");
  const [generatingPdf, setGeneratingPdf] = useState<string | null>(null);
  const [reportHistory, setReportHistory] = useState<ReportHistoryItem[]>([]);

  useEffect(() => {
    async function LoadReports() {
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      const salesData = await GetReportSales();
      const customersData = await GetReportCustomers();
      const stockData = await GetReportStock();
      const financialData = await GetReportFinancial(month, year);

      if (salesData) {
        setSalesDescription(
          `${salesData.count} entradas registradas totalizando R$ ${salesData.totalAmount.toLocaleString("pt-BR")}`,
        );
      }

      if (customersData) {
        setCustomersDescription(
          `${customersData.active} clientes ativos, ${customersData.total} clientes no total`,
        );
      }

      if (stockData) {
        setStockDescription(
          `${stockData.totalProducts} produtos cadastrados, ${stockData.lowStockCount} com estoque baixo`,
        );
      }

      if (financialData) {
        setFinancialDescription(
          `Receita total de R$ ${financialData.revenue.toLocaleString("pt-BR")}, despesas de R$ ${financialData.expenses.toLocaleString("pt-BR")}, lucro liquido de R$ ${financialData.balance.toLocaleString("pt-BR")}`,
        );
      }
    }

    const storedHistory = localStorage.getItem(REPORT_HISTORY_STORAGE_KEY);

    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory) as ReportHistoryItem[];

        if (Array.isArray(parsedHistory)) {
          setReportHistory(parsedHistory.slice(0, 4));
        }
      } catch {
        localStorage.removeItem(REPORT_HISTORY_STORAGE_KEY);
      }
    }

    LoadReports();
  }, []);
  const saveReportHistory = (title: string, fileName: string) => {
    const nextItem: ReportHistoryItem = {
      id: String(Date.now()),
      title,
      fileName,
      generatedAt: new Date().toISOString(),
    };

    setReportHistory((currentHistory) => {
      const nextHistory = [nextItem, ...currentHistory].slice(0, 4);
      localStorage.setItem(
        REPORT_HISTORY_STORAGE_KEY,
        JSON.stringify(nextHistory),
      );
      return nextHistory;
    });
  };
  const handleGenerateReportPdf = async (
    reportKey: string,
    download: () => Promise<void>,
    title: string,
    fileName: string,
  ) => {
    try {
      setGeneratingPdf(reportKey);
      await download();
      saveReportHistory(title, fileName);
    } catch (error) {
      console.error(`Error generating ${reportKey} PDF:`, error);
    } finally {
      setGeneratingPdf(null);
    }
  };

  const handleGenerateSalesPdf = () =>
    handleGenerateReportPdf(
      "sales",
      DownloadReportSalesPdf,
      "Relatorio de Vendas",
      "relatorio-vendas.pdf",
    );

  const handleGenerateCustomersPdf = () =>
    handleGenerateReportPdf(
      "customers",
      DownloadReportCustomersPdf,
      "Relatorio de Clientes",
      "relatorio-clientes.pdf",
    );

  const handleGenerateStockPdf = () =>
    handleGenerateReportPdf(
      "stock",
      DownloadReportStockPdf,
      "Relatorio de Estoque",
      "relatorio-estoque.pdf",
    );

  const handleGenerateFinancialPdf = () => {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    return handleGenerateReportPdf(
      "financial",
      () => DownloadReportFinancialPdf(month, year),
      "Relatorio Financeiro",
      "relatorio-financeiro.pdf",
    );
  };
  const reportCards = [
    {
      title: "Relatorio de Vendas",
      reportKey: "sales",
      description: salesDescription,
      footer: "Resumo das vendas por periodo",
      icon: TrendingUp,
      iconColor: "#0A76A9",
      iconBg: "#E6F1F6",
      onGenerate: handleGenerateSalesPdf,
    },
    {
      title: "Relatorio de Clientes",
      reportKey: "customers",
      description: customersDescription,
      footer: "Resumo dos clientes por periodo",
      icon: Users,
      iconColor: "#3ACB6F",
      iconBg: "#E8F9EE",
      onGenerate: handleGenerateCustomersPdf,
    },
    {
      title: "Relatorio de Estoque",
      reportKey: "stock",
      description: stockDescription,
      footer: "Resumo do estoque por periodo",
      icon: Package,
      iconColor: "#F59F0A",
      iconBg: "#FDF5E6",
      onGenerate: handleGenerateStockPdf,
    },
    {
      title: "Relatorio Financeiro",
      reportKey: "financial",
      description: financialDescription,
      footer: "Resumo do financeiro por periodo",
      icon: DollarSign,
      iconColor: "#AF57DB",
      iconBg: "#F7EEFB",
      onGenerate: handleGenerateFinancialPdf,
    },
  ];

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

                        <button
                          type="button"
                          onClick={item.onGenerate}
                          disabled={generatingPdf !== null}
                          className="absolute bottom-0 right-0 flex cursor-pointer gap-2 rounded-lg border border-slate-300 p-2 text-slate-800 transition-colors hover:border-[#0A76A9] hover:bg-[#E6F1F6] hover:text-[#0A76A9] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <File color="#0A76A9" size={20} />
                          <h3 className="text-sm">{generatingPdf === item.reportKey ? "Gerando" : "Gerar"}</h3>
                        </button>
                      </div>
                    </StatCard>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6">
              <StatCard>
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-[#E6F1F6] p-3">
                    <Clock className="text-[#2082B1]" size={22} />
                  </div>
                  <span>
                    <h2 className="text-xl font-bold text-slate-800">Relatorios gerados</h2>
                    <p className="text-sm text-slate-500">Ultimos 4 arquivos gerados nesta pagina</p>
                  </span>
                </div>

                {reportHistory.length === 0 ? (
                  <p className="mt-6 text-sm text-slate-500">Nenhum relatorio gerado recentemente.</p>
                ) : (
                  <div className="mt-6 flex flex-col gap-5">
                    {reportHistory.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"
                      >
                        <div className="flex items-center gap-5">
                          <div className="rounded-lg bg-[#E6F1F6] p-2.5">
                            <File size={20} color="#0A76A9" />
                          </div>
                          <div className="flex flex-col">
                            <p className="font-medium text-slate-800">{item.title}</p>
                            <p className="text-sm text-slate-500">{item.fileName}</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500">
                          {formatGeneratedAt(item.generatedAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </StatCard>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.main>
  );
}
