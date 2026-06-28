"use client";
import ButtonForm from "@/components/buttonForm";
import Input from "@/components/input";
import { registerUser } from "@/services/auth";
import { Building, Building2, Check, Lock, Mail, Phone, User } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [formError, setFormError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setFormError("");
            await registerUser(email, password, name, phone, companyName);
            router.push("/login");
        } catch (error) {
            setFormError(
                error instanceof Error
                    ? error.message
                    : "Nao foi possivel criar a conta.",
            );
        }
    };


    
 


    return (
        <motion.main
            className="min-h-screen w-full flex flex-col lg:flex-row font-sans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <motion.section
                className="hidden lg:flex flex-1 bg-gradient-to-br from-[#2082B1] to-[#3890B9] text-white flex-col justify-center items-center p-12 text-center"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12, duration: 0.7 }}
            >
                <motion.div
                    className="max-w-lg space-y-6"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22, duration: 0.6 }}
                >
                    <h2 className="text-4xl font-bold leading-tight">
                        Comece a transformar sua gestão hoje
                    </h2>
                    <p className="text-blue-50 text-lg opacity-90">
                        Crie sua conta em segundos e tenha acesso a todas as funcionalidades do sistema.
                    </p>

                    <motion.article
                        className="flex flex-col gap-6 pt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.32, duration: 0.6 }}
                    >
                        <motion.div
                            className="flex items-center gap-5 bg-[#2384B2]/10 backdrop-blur-md p-6 rounded-2xl border border-white/20"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.38, duration: 0.45 }}
                        >
                            <div className="w-12 h-12 rounded-2xl bg-[#56A1C4] flex items-center justify-center">
                                <Check />
                            </div>
                            <div className="text-start">
                                <h3 className="text-[20px] font-bold">Teste grátis por 14 dias</h3>
                                <p className="text-sm text-blue-100">Sem cartão de crédito</p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="flex items-center gap-5 bg-[#2384B2]/10 backdrop-blur-md p-6 rounded-2xl border border-white/20"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.46, duration: 0.45 }}
                        >
                            <div className="w-12 h-12 rounded-2xl bg-[#56A1C4] flex items-center justify-center">
                                <Check />
                            </div>
                            <div className="text-start">
                                <h2 className="text-[20px] font-bold">Suporte especializado</h2>
                                <p className="text-sm text-blue-100">Atendimento em português</p>
                            </div>
                        </motion.div>
                    </motion.article>
                </motion.div>
            </motion.section>

            <motion.section
                className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:px-20 bg-white"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
            >
                <motion.div
                    className="w-full max-w-md space-y-8"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.55 }}
                >
                    <header className="space-y-2">
                        <div className="flex items-center gap-2 text-[#2082B1]">
                            <Building2
                                size={32}
                                className="bg-[#2082B1] text-white p-1.5 rounded-lg"
                            />
                            <h1 className="text-2xl font-bold text-slate-800">GestIO</h1>
                        </div>

                        <div className="pt-6">
                            <h2 className="text-3xl font-bold text-slate-900">Criar conta</h2>
                            <p className="text-slate-500 mt-2">Preencha os dados abaixo para começar</p>
                        </div>
                    </header>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="flex gap-5">
                            <Input
                                label="Nome completo"
                                minLength={3}
                                type="text"
                                placeholder="Seu nome"
                                icon={User}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Input
                                label="Telefone"
                                minLength={11}
                                maxLength={11}
                                type="text"
                                placeholder="(00) 00000-0000"
                                icon={Phone}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                            />
                        </div>
                        <Input
                            label="Nome da Empresa"
                            type="text"
                            minLength={4}
                            placeholder="Sua Empresa"
                            icon={Building}
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                        <Input
                            label="E-mail"
                            type="email"
                            placeholder="seu@email.com"
                            icon={Mail}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            label="Senha"
                            type="password"
                            placeholder="Mínimo 4 caracteres"
                            icon={Lock}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {formError && (
                            <p className="text-sm font-medium text-red-600">
                                {formError}
                            </p>
                        )}
                        <div className="flex items-center text-sm gap-2">
                            <input type="checkbox" id="terms" required />
                            <label htmlFor="terms" className="text-sm text-slate-600">
                                Li e concordo com os
                                <span className="text-[#2082B1] cursor-pointer hover:underline">
                                    {" "}Termos de Uso
                                </span>{" "}
                                e
                                <span className="text-[#2082B1] cursor-pointer hover:underline">
                                    {" "}Política de Privacidade
                                </span>
                            </label>
                        </div>
                        <ButtonForm text="Entrar" type="submit" />
                    </form>
                    <Link href="/login">
                        <p className="text-center text-sm text-slate-600">
                            Ja tem uma conta?{" "}
                            <span className="text-[#2082B1] font-bold cursor-pointer hover:underline">
                                Fazer Login
                            </span>
                        </p>
                    </Link>
                </motion.div>
            </motion.section>
        </motion.main>
    );
}
