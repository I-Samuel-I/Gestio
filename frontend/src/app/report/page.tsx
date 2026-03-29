import Navbar from "@/components/sidebar";
import StatCard from "@/components/statCard";
import { report } from "@/mock/report";
import { DollarSign, File, Package, TrendingUp, Users } from "lucide-react";

export default function Report() {
    return (
        <main className="flex min-h-screen bg-slate-50">
            <Navbar />
            <div className="flex flex-col flex-1 md:ml-50 lg:ml-70">

                <div className="p-8 space-y-6">

                    {/* HERO SECTION */}
                    <section >
                        <h1 className="text-2xl font-bold text-slate-800">Relatórios</h1>
                        <p className="text-slate-500">Gere e visualize seus relatórios</p>
                        <div className=" mt-5 grid  grid-cols-1 md:grid-cols-2 gap-5">
                            <StatCard>
                                <div className="flex gap-5 relative ">
                                    <div className="bg-[#E6F1F6] p-3 flex items-center rounded-xl max-h-13 ">
                                        <TrendingUp color="#0A76A9" size={26} />
                                    </div>
                                    <div className="mb-2">
                                        <div>
                                            <h2 className="text-xl font-bold text-slate-800">Relatório de Vendas</h2>
                                            <p className="text-slate-500 font-light mt-1">{report.salesReport}</p>
                                        </div>
                                        <p className="text-slate-500 font-light text-sm mt-5">Resumo das vendas por período</p>
                                    </div>
                                    <button
                                        className=" flex gap-2 p-2 rounded-lg cursor-pointer text-slate-800 border border-slate-300 absolute right-0 bottom-0
                                                hover:bg-[#E6F1F6] hover:border-[#0A76A9] hover:text-[#0A76A9] transition-colors 
                                            ">
                                        <File color="#0A76A9" size={20} />
                                        <h3 className="text-sm  ">Gerar</h3>
                                    </button>
                                </div>
                            </StatCard>
                            <StatCard>
                                <div className="flex gap-5 relative ">
                                    <div className="bg-[#E8F9EE] p-3 flex items-center rounded-xl max-h-13 ">
                                        <Users color="#3ACB6F" size={26} />
                                    </div>
                                    <div className="mb-2">
                                        <div>
                                            <h2 className="text-xl font-bold text-slate-800">Relatório de Clientes</h2>
                                            <p className="text-slate-500 font-light mt-1">{report.clientsReport}</p>
                                        </div>
                                        <p className="text-slate-500 font-light text-sm mt-5">Resumo dos clientes por período</p>
                                    </div>
                                    <button
                                        className=" flex gap-2 p-2 rounded-lg cursor-pointer text-slate-800 border border-slate-300 absolute right-0 bottom-0
                                                hover:bg-[#E6F1F6] hover:border-[#0A76A9] hover:text-[#0A76A9] transition-colors 
                                            ">
                                        <File color="#0A76A9" size={20} />
                                        <h3 className="text-sm  ">Gerar</h3>
                                    </button>
                                </div>
                            </StatCard>
                            <StatCard>
                                <div className="flex gap-5 relative ">
                                    <div className="bg-[#FDF5E6] p-3 flex items-center rounded-xl max-h-13 ">
                                        <Package color="#F59F0A" size={26} />
                                    </div>
                                    <div className="mb-2">
                                        <div>
                                            <h2 className="text-xl font-bold text-slate-800">Relatório de Estoque</h2>
                                            <p className="text-slate-500 font-light mt-1">{report.stockReport}</p>
                                        </div>
                                        <p className="text-slate-500 font-light text-sm mt-5">Resumo do estoque por período</p>
                                    </div>
                                    <button
                                        className=" flex gap-2 p-2 rounded-lg cursor-pointer text-slate-800 border border-slate-300 absolute right-0 bottom-0
                                                hover:bg-[#E6F1F6] hover:border-[#0A76A9] hover:text-[#0A76A9] transition-colors 
                                            ">
                                        <File color="#0A76A9" size={20} />
                                        <h3 className="text-sm  ">Gerar</h3>
                                    </button>
                                </div>
                            </StatCard>
                            <StatCard>
                                <div className="flex gap-5 relative ">
                                    <div className="bg-[#F7EEFB] p-3 flex items-center rounded-xl max-h-13 ">
                                        <DollarSign color="#AF57DB" size={26} />
                                    </div>
                                    <div className="mb-2">
                                        <div>
                                            <h2 className="text-xl font-bold text-slate-800">Relatório de Financeiro</h2>
                                            <p className="text-slate-500 font-light mt-1">{report.financeReport}</p>
                                        </div>
                                        <p className="text-slate-500 font-light text-sm mt-5">Resumo do financeiro por período</p>
                                    </div>
                                    <button
                                        className=" flex gap-2 p-2 rounded-lg cursor-pointer text-slate-800 border border-slate-300 absolute right-0 bottom-0
                                                hover:bg-[#E6F1F6] hover:border-[#0A76A9] hover:text-[#0A76A9] transition-colors 
                                            ">
                                        <File color="#0A76A9" size={20} />
                                        <h3 className="text-sm  ">Gerar</h3>
                                    </button>
                                </div>
                            </StatCard>
                        </div>
                    </section>

                </div>

            </div>
        </main>
    )
}