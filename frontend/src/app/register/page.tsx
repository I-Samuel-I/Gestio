import ButtonForm from "@/components/buttonForm"
import Input from "@/components/input"
import { Building2, Mail, Lock, Building, Phone, Check, User } from "lucide-react"
import Link from "next/link"


export default function Register() {
    return (
        <main className="min-h-screen w-full flex flex-col lg:flex-row font-sans">
            <section className="hidden lg:flex flex-1 bg-gradient-to-br from-[#2082B1] to-[#3890B9] text-white flex-col justify-center items-center p-12 text-center">
                <div className="max-w-lg space-y-6">
                    <h2 className="text-4xl font-bold leading-tight">
                        Comece a transformar sua gestão hoje</h2>
                    <p className="text-blue-50 text-lg opacity-90">
                        Crie sua conta em segundos e tenha acesso a todas as funcionalidades do sistema.
                    </p>

                    <article className="flex flex-col gap-6 pt-8">
                        <div className="flex items-center gap-5 bg-[#2384B2]/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 ">
                            <div className="w-12 h-12 rounded-2xl bg-[#56A1C4] flex items-center justify-center">
                                <Check />
                            </div>
                            <div className="text-start ">
                                <h3 className="text-[20px] font-bold">Teste grátis por 14 dias</h3>
                                <p className="text-sm text-blue-100">Sem cartão de crédito</p>
                            </div>

                        </div>
                        <div className="flex items-center gap-5 bg-[#2384B2]/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 ">
                            <div className="w-12 h-12 rounded-2xl bg-[#56A1C4] flex items-center justify-center">
                                <Check />
                            </div>
                            <div className="text-start ">
                                <h2 className="text-[20px] font-bold">Suporte especializado</h2>
                                <p className="text-sm text-blue-100">Atendimento em português</p>
                            </div>

                        </div>
                    </article>
                </div>
            </section>
            <section className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:px-20 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <header className="space-y-2">
                        <div className="flex items-center gap-2 text-[#2082B1]">
                            <Building2 size={32} className="bg-[#2082B1] text-white p-1.5 rounded-lg" />
                            <h1 className="text-2xl font-bold text-slate-800">GestIO</h1>
                        </div>

                        <div className="pt-6">
                            <h2 className="text-3xl font-bold text-slate-900">Criar conta</h2>
                            <p className="text-slate-500 mt-2">Preencha os dados abaixo para começar</p>
                        </div>
                    </header>
                    <form className="space-y-5">

                        <div className="flex gap-5">
                            <Input
                                label="Nome completo"
                                type="text"
                                placeholder="Seu nome"
                                icon={User}
                            />
                            <Input
                                label="Telefone"
                                type="number"
                                placeholder="(00) 00000-0000"
                                icon={Phone}
                            />
                        </div>
                        <Input
                            label="Nome da Empresa"
                            type="text"
                            placeholder="Sua Empresa"
                            icon={Building}
                        />
                        <Input
                            label="E-mail"
                            type="email"
                            placeholder="seu@email.com"
                            icon={Mail}
                        />
                        <Input
                            label="Senha"
                            type="password"
                            placeholder="Mínimo 8 caracteres"
                            icon={Lock}
                        />
                        <div className="flex items-center text-sm gap-2">
                            <input type="checkbox" id="terms" />
                            <label htmlFor="terms" className=" text-sm text-slate-600">Li e concordo com os
                                <span className="text-[#2082B1]  cursor-pointer hover:underline"> Termos de Uso</span> e
                                <span className="text-[#2082B1]  cursor-pointer hover:underline"> Política de Privacidade</span>
                            </label>
                        </div>
                        <ButtonForm text="Entrar" type="submit" />
                    </form>
                    <Link href="/login">
                        <p className="text-center text-sm text-slate-600">
                            Ja tem uma conta? <span className="text-[#2082B1] font-bold cursor-pointer hover:underline">Fazer Login</span>
                        </p>
                    </Link>
                </div>
            </section>
        </main>
    )
}