import Header from "@/components/header";
import Navbar from "@/components/navbar";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex">
      <Navbar />

      <div className="flex flex-col flex-1 md:ml-50 lg:ml-70">
        <Header title="Error" />

        <section className="flex flex-1  flex-col items-center justify-center">
          <div className="bg-[#EBF5FF] w-fit p-16 rounded-full shadow relative animate-[floatUpDown_6s_ease-in-out_infinite]">
            <div className="bg-[#C8DEFD] absolute bottom-30 p-5  right-5 rounded-full" />
            <div className="bg-[#D9E9FE] absolute top-30 p-4 left-5 rounded-full" />
            <div className="bg-white p-3 rounded-2xl">
              <AlertTriangle color="#2082B1" size={50} className="bg-[#EBF5FF] p-2 rounded-2xl" />
            </div>
          </div>
          <div className="text-center space-y-2 mt-10">
            <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold text-slate-800">404</h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-slate-500">Página não encontrada</h2>
            <p className="text-xs max-w-xs sm:text-base  text-slate-400 sm:max-w-md mt-5">
              Desculpe, a página que você está procurando não existe ou foi movida. Verifique a URL ou utilize a navegação lateral.
            </p>
          </div>
          <Link href="/dashboard">
            <button className="py-2 px-5  mt-5 text-center w-fit bg-[#2082B1] hover:bg-[#1a6a8f] text-white sm:py-3 sm:px-10 rounded-lg transition-colors 
            shadow-lg shadow-blue-900/10 active:scale-[0.98] hover:cursor-pointer">Voltar para o Dashboard
            </button>
          </Link>
        </section>
      </div>
    </main>
  );
}
