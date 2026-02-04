import Header from "@/components/header";
import Input from "@/components/input";
import Navbar from "@/components/navbar";
import ToogleButton from "@/components/toogleButton";
import { Bell, Building, Clock, Globe, Palette } from "lucide-react";

export default function Config() {
  return (
    <main>
      <Navbar />
      <div className="flex flex-col flex-1 md:ml-50 lg:ml-70">
        <Header title="Configurações" />
        <div className="p-8 space-y-6">
          <section>
            <h1 className="text-2xl font-bold text-slate-800">Configurações</h1>
            <p className="text-slate-500">
              Gerencie as configurações do sistema.
            </p>

            <div className="mt-7 bg-white shadow rounded-2xl lg:w-3/4 p-5">
              <div className="flex items-center gap-2">
                <div className="p-3 bg-[#E6F1F6] rounded-xl">
                  <Building className="text-[#2082B1]" />
                </div>
                <span>
                  <h2>Dados da Empresa</h2>
                  <p className="text-slate-500 text-sm">
                    Informações gerais do negócio
                  </p>
                </span>
              </div>
              <div className="flex flex-col  sm:grid grid-cols-2 gap-5 mt-7">
                <Input label="Nome da Empresa" type="text" />
                <Input label="CNPJ" type="text" />
                <Input label="E-mail de Contato" type="text" />
                <Input label="Telefone" type="number" />
              </div>
            </div>
          </section>
          <section>
            <div className="mt-7 bg-white shadow rounded-2xl lg:w-3/4 p-5">
              <div className="flex items-center gap-2">
                <div className="p-3 bg-[#FEF5E6] rounded-xl">
                  <Bell className="text-[#F6A923]" />
                </div>
                <span>
                  <h2>Notificações</h2>
                  <p className="text-slate-500 text-sm">
                    Configure como receber alertas.
                  </p>
                </span>
              </div>
              <div>
                <div className="flex gap-5 items-center justify-between mt-7 border-b border-slate-200">
                  <span>
                    <h2>Notificações por E-mail</h2>
                    <p className="text-slate-500 text-sm mt-1">
                      Receba atualizações no seu E-mail
                    </p>
                  </span>
                  <ToogleButton />
                </div>
                <div className="flex gap-5 items-center justify-between mt-7 border-b border-slate-200">
                  <span>
                    <h2>Aleta de estoque baixo</h2>
                    <p className="text-slate-500 text-sm mt-1">
                      Quando produtos atingirem o mínimo
                    </p>
                  </span>
                  <ToogleButton />
                </div>
                <div className="flex gap-5 items-center  justify-between mt-7 border-b border-slate-200">
                  <span>
                    <h2>Resumo Diário</h2>
                    <p className="text-slate-500 text-sm mt-1">
                      Relatório automático ao fim do dia
                    </p>
                  </span>
                  <ToogleButton />
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="mt-7 bg-white shadow rounded-2xl lg:w-3/4 p-5">
              <div className="flex items-center gap-2">
                <div className="p-3 bg-[#F7EEFB] rounded-xl">
                  <Palette className="text-[#B769DF]" />
                </div>
                <span>
                  <h2>Preferências</h2>
                  <p className="text-slate-500 text-sm">
                    Personalize sua experiência
                  </p>
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-5 mt-7">
                <Input icon={Globe} label="Idioma" type="select" />
                <Input icon={Clock} label="Fuso Horário" type="select" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
