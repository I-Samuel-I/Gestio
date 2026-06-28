"use client";
import ButtonForm from "@/components/buttonForm";
import Counter from "@/components/counterAnimate";
import Input from "@/components/input";
import { loginUser } from "@/services/auth";
import { Building2, Lock, Mail } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formError, setFormError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setFormError("");
            await loginUser(email, password);
            router.push("/products");
        } catch (error) {
            setFormError(
                error instanceof Error
                    ? error.message
                    : "Email ou senha incorretos.",
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
                className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:px-20"
                initial={{ opacity: 0, x: -16 }}
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
                            <h1 className="text-2xl font-bold text-slate-900">GestIO</h1>
                        </div>

                        <div className="pt-6">
                            <h2 className="text-3xl font-bold text-slate-900">
                                Bem-vindo(a) de volta
                            </h2>
                            <p className="text-slate-500 mt-2">
                                Entre com suas credenciais para acessar sua conta
                            </p>
                        </div>
                    </header>

                    <form className="space-y-5" onSubmit={handleSubmit}>
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
                            placeholder="•••••••••••"
                            icon={Lock}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {formError && (
                            <p className="text-sm font-medium text-red-600">
                                {formError}
                            </p>
                        )}
                        <ButtonForm text="Entrar" type="submit" />
                    </form>

                    <Link href="/register">
                        <p className="text-center text-sm text-slate-500">
                            Não tem uma conta?{" "}
                            <span className="text-[#2082B1] font-bold cursor-pointer hover:underline">
                                Criar conta
                            </span>
                        </p>
                    </Link>
                </motion.div>
            </motion.section>

            <motion.section
                className="hidden lg:flex flex-1 bg-gradient-to-br from-[#2082B1] to-[#3890B9] text-white flex-col justify-center items-center p-12 text-center"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18, duration: 0.7 }}
            >
                <motion.div
                    className="max-w-lg space-y-6"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28, duration: 0.6 }}
                >
                    <h2 className="text-4xl font-bold leading-tight">
                        Gerencie seu negócio com eficiência
                    </h2>
                    <p className="text-blue-50 text-lg opacity-90">
                        Sistema completo para controle de clientes, produtos, finanças e muito mais.
                    </p>

                    <motion.article
                        className="grid grid-cols-2 gap-6 pt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.38, duration: 0.6 }}
                    >
                        <motion.div
                            className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.42, duration: 0.45 }}
                        >
                            <p className="text-3xl font-bold">
                                <Counter target={2500} />
                            </p>
                            <p className="text-sm text-blue-100">Empresas ativas</p>
                        </motion.div>
                        <motion.div
                            className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.45 }}
                        >
                            <p className="text-3xl font-bold">
                                <Counter target={99.9} />%
                            </p>
                            <p className="text-sm text-blue-100">Uptime garantido</p>
                        </motion.div>
                    </motion.article>
                </motion.div>
            </motion.section>
        </motion.main>
    );
}
