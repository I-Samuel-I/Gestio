import ButtonForm from "@/components/buttonForm"
import Counter from "@/components/counterAnimate"
import Input from "@/components/input"
import { Building2, Mail, Lock } from "lucide-react"
import Link from "next/link"

export default function Login() {
    return (
        <main className="min-h-screen w-full flex flex-col lg:flex-row font-sans">
            <section className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:px-20 bg-">
                <div className="w-full max-w-md space-y-8">
                    <header className="space-y-2">
                        <div className="flex items-center gap-2 text-[#2082B1]">
                            <Building2 size={32} className="bg-[#2082B1] text-white p-1.5 rounded-lg" />
                            <h1 className="text-2xl font-bold text-slate-800">GestIO</h1>
                        </div>

                        <div className="pt-6">
                            <h2 className="text-3xl font-bold text-slate-900">Bem-vindo de volta</h2>
                            <p className="text-slate-500 mt-2">Entre com suas credenciais para acessar sua conta</p>
                        </div>
                    </header>
                    <form className="space-y-5">
                        <Input
                            label="E-mail"
                            type="email"
                            placeholder="seu@email.com"
                            icon={Mail}
                        />
                        <Input
                            label="Senha"
                            type="password"
                            placeholder="•••••••••••"
                            icon={Lock}
                        />
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="remember-me" className="rounded border-gray-300 text-[#2082B1] focus:ring-[#2082B1]" />
                                <label htmlFor="remember-me" className="text-slate-600 cursor-pointer">Lembrar de mim</label>
                            </div>
                            <p className="text-[#2082B1] font-semibold hover:underline cursor-pointer">Esqueceu a senha?</p>
                        </div>
                        <ButtonForm text="Entrar" type="submit" />
                    </form>
                    <Link href="/register">
                        <p className="text-center text-sm text-slate-600">
                            Não tem uma conta? <span className="text-[#2082B1] font-bold cursor-pointer hover:underline">Criar conta</span>
                        </p>
                    </Link>

                </div>
            </section>

            <section className="hidden lg:flex flex-1 bg-gradient-to-br from-[#2082B1] to-[#3890B9]   text-white flex-col justify-center items-center p-12 text-center">
                <div className="max-w-lg space-y-6">
                    <h2 className="text-4xl font-bold leading-tight">Gerencie seu negócio com eficiência</h2>
                    <p className="text-blue-50 text-lg opacity-90">
                        Sistema completo para controle de clientes, produtos, finanças e muito mais.
                    </p>

                    <article className="grid grid-cols-2 gap-6 pt-8">
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                            <p className="text-3xl font-bold"><Counter target={2500} /></p>
                            <p className="text-sm text-blue-100">Empresas ativas</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                            <p className="text-3xl font-bold"> <Counter target={99.9} />%</p>

                            <p className="text-sm text-blue-100">Uptime garantido</p>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    )
}