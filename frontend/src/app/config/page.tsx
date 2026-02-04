import Header from "@/components/header";
import Input from "@/components/input";
import Navbar from "@/components/navbar";
import { Building } from "lucide-react";

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

            <div className="mt-7 bg-white shadow rounded-2xl w-3/4 p-5">
              <div className="flex items-center gap-2">
                <Building />
                <span>
                  <h2>Dados da Empresa</h2>
                  <p>Informações gerais do negócio</p>
                </span>
              </div>
              <div className="grid grid-cols-2 gap-5 mt-7">
                <Input label="Nome da Empresa" type="text" />
                <Input label="CNPJ" type="text" />
                <Input label="E-mail de Contato" type="text" />
                <Input label="Telefone" type="number" />
              </div>
            </div>
          </section>
          <section>
            <div className="mt-7 bg-white shadow rounded-2xl w-3/4 p-5">
              <div className="flex items-center gap-2">
                <Building />
                <span>
                  <h2>Notificações</h2>
                  <p>Configure como receber alertas.</p>
                </span>
              </div>
              <div>
                <div className="border-b mt-7">
                  <span>
                    <h2>Notificações por E-mail</h2>
                    <p>Receba atualizações no seu E-mail</p>
                  </span>
                </div>
                <div className="border-b mt-7">
                  <span>
                    <h2>Aleta de estoque baixo</h2>
                    <p>Quando produtos atingirem o mínimo</p>
                  </span>
                </div>
                <div className="mt-7">
                  <span>
                    <h2>Resumo Diário</h2>
                    <p>Relatório automático ao fim do dia</p>
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
