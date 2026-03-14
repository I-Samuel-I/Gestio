"use client"

import Link from "next/link";
import { useState } from "react";

export default function NavBar() {

    const [isOpen, setIsOpen] = useState(false);
    const toogleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            {/* Burger menu for mobile */}
            <button onClick={toogleMenu} className="md:hidden flex   flex-col justify-center items-center w-6 h-6 cursor-pointer relative z-20">
                <span className={`block absolute h-[3px] w-6 bg-[#62748e] rounded transition-all duration-300
                ${isOpen ? "rotate-45 top-3" : "top-1"}`} />
                <span className={`block absolute h-[3px] w-6 bg-[#62748e] rounded transition-all duration-300
                ${isOpen ? "opacity-0" : "top-3"}`} />
                <span className={`block absolute h-[3px] w-6 bg-[#62748e] rounded transition-all duration-300
                ${isOpen ? "-rotate-45 top-3" : "top-5"}`} />

            </button>
            {isOpen && (
                <nav className=" absolute top-0 h-full w-full right-0 bg-white shadow-lg rounded-lg p-4 z-10">
                    <ul className="flex flex-col gap-4">
                        <Link href="/products">
                            <li className="hover:text-[#0DA2E7] hover:bg-[#E7F6FE] rounded-lg transition-colors p-2 cursor-pointer">Produtos</li>
                        </Link>
                        <Link href="/clients">
                            <li className="hover:text-[#0DA2E7] hover:bg-[#E7F6FE] rounded-lg transition-colors p-2 cursor-pointer">Clientes</li>
                        </Link>
                        <Link href="/users">
                            <li className="hover:text-[#0DA2E7] hover:bg-[#E7F6FE] rounded-lg transition-colors p-2 cursor-pointer">Usuários</li>
                        </Link>
                        <Link href="/dashboard">
                            <li className="hover:text-[#0DA2E7] hover:bg-[#E7F6FE] rounded-lg transition-colors p-2 cursor-pointer">Dashboard</li>
                        </Link>
                        <Link href="/finance">
                            <li className="hover:text-[#0DA2E7] hover:bg-[#E7F6FE] rounded-lg transition-colors p-2 cursor-pointer">Financeiro</li>
                        </Link>
                        <Link href="/report">
                            <li className="hover:text-[#0DA2E7] hover:bg-[#E7F6FE] rounded-lg transition-colors p-2 cursor-pointer">Relatórios</li>
                        </Link>
                        <Link href="/settings">
                            <li className="hover:text-[#0DA2E7] hover:bg-[#E7F6FE] rounded-lg transition-colors p-2 cursor-pointer">Configurações</li>
                        </Link>
                        <Link href="/logout">
                            <li className="hover:text-[#0DA2E7] hover:bg-[#E7F6FE] rounded-lg transition-colors p-2 cursor-pointer">Sair</li>
                        </Link>
                    </ul>
                </nav>
            )}

        </>
    )
}