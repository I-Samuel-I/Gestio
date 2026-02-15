"use client";

import {
  LayoutDashboard,
  Package,
  Users,
  CircleDollarSign,
  FileText,
  Settings,
  Building2,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type MobileProps = {
  mobileOpen: boolean;
  onClose: () => void;
};

type NavItemProps = {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
};

type ActiveItem =
  | ""
  | "Produtos"
  | "Clientes"
  | "Usuários"
  | "Dashboard"
  | "Financeiro"
  | "Relatório"
  | "Configurações";

export default function Navbar({ mobileOpen, onClose }: MobileProps) {
  const [activeItem, setActiveItem] = useState<ActiveItem>("");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/products")) {
      setActiveItem("Produtos");
    } else if (pathname.startsWith("/clients")) {
      setActiveItem("Clientes");
    }
    else if (pathname.startsWith("/users")) {
      setActiveItem("Usuários");
    }
    else if (pathname.startsWith("/dashboard")) {
      setActiveItem("Dashboard");
    }
    else if (pathname.startsWith("/financeiro")) {
      setActiveItem("Financeiro");
    }
    else if (pathname.startsWith("/relatorio")) {
      setActiveItem("Relatório");
    }
    else if (pathname.startsWith("/config")) {
      setActiveItem("Configurações");
    }
    else {
      setActiveItem("");
    }
  }, [pathname]);

  return (
    <>
      {mobileOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <nav className="hidden md:flex fixed flex-col md:w-50 lg:w-70 h-screen bg-white border-r border-gray-200 p-4 justify-between">
        <div>
          {/* Logo Section */}
          <div className="flex items-center gap-3 px-2 mb-8">
            <Building2 size={28} color="#2082B1" strokeWidth={2.5} />
            <h1 className="text-xl font-bold text-gray-800">GestIO</h1>
          </div>

          <div className="mb-6">
            <h2 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Cadastros
            </h2>
            <ul className="space-y-1">
              <Link href="/products">
                <NavItem
                  icon={Package}
                  label="Produtos"
                  active={activeItem === "Produtos"}
                  onClick={() => setActiveItem("Produtos")}
                />
              </Link>
              <Link href="/clients">
                <NavItem
                  icon={Users}
                  label="Clientes"
                  active={activeItem === "Clientes"}
                  onClick={() => setActiveItem("Clientes")}
                />
              </Link>
              <Link href="/users">
                <NavItem
                  icon={Users}
                  label="Usuários"
                  active={activeItem === "Usuários"}
                  onClick={() => setActiveItem("Usuários")}
                />
              </Link>


            </ul>
          </div>

          <div>
            <h2 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Operações
            </h2>
            <ul className="space-y-1">
              <Link href="/dashboard">
                <NavItem
                  icon={LayoutDashboard}
                  label="Dashboard"
                  active={activeItem === "Dashboard"}
                  onClick={() => setActiveItem("Dashboard")}
                />
              </Link>
              <Link href="/financial">
                <NavItem
                  icon={CircleDollarSign}
                  label="Financeiro"
                  active={activeItem === "Financeiro"}
                  onClick={() => setActiveItem("Financeiro")}
                />
              </Link>
              <Link href="/report">
                <NavItem
                  icon={FileText}
                  label="Relatório"
                  active={activeItem === "Relatório"}
                  onClick={() => setActiveItem("Relatório")}
                />
              </Link>
              <Link href="/config">
                <NavItem
                  icon={Settings}
                  label="Configurações"
                  active={activeItem === "Configurações"}
                  onClick={() => setActiveItem("Configurações")}
                />
              </Link>
            </ul>
          </div>
        </div>

        <div className="relative border-t border-gray-100 pt-4 flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-[#0DA2E7] flex items-center justify-center text-white font-bold">
            AD
          </div>
          <div className=" flex gap-3 ">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 truncate">
                Admin
              </h3>
              <p className="text-xs text-gray-500 truncate">
                admin@empresa.com
              </p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

function NavItem({ icon: Icon, label, active, onClick }: NavItemProps) {
  return (
    <li>
      <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:cursor-pointer
                    ${active
            ? "bg-[#0DA2E7] text-white"
            : "text-black hover:bg-gray-100"
          }`}
      >
        <Icon size={20} className={active ? "text-white" : "text-black"} />
        <span className="text-sm font-semibold">{label}</span>
      </button>
    </li>
  );
}
