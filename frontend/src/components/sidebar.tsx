    "use client";

import {
  Building2,
  CircleDollarSign,
  FileText,
  LayoutDashboard,
  LucideIcon,
  Package,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MobileProps = {
  mobileOpen: boolean;
  onClose: () => void;
};

type NavItemProps = {
  icon: LucideIcon;
  label: string;
  active?: boolean;
};

type ActiveItem =
  | ""
  | "Produtos"
  | "Clientes"
  | "Usuarios"
  | "Dashboard"
  | "Financeiro"
  | "Relatorio"
  | "Configuracoes";

export default function Navbar({ mobileOpen, onClose }: MobileProps) {
  const pathname = usePathname();
  let activeItem: ActiveItem = "";

  if (pathname.startsWith("/products")) {
    activeItem = "Produtos";
  } else if (pathname.startsWith("/clients")) {
    activeItem = "Clientes";
  } else if (pathname.startsWith("/users")) {
    activeItem = "Usuarios";
  } else if (pathname.startsWith("/dashboard")) {
    activeItem = "Dashboard";
  } else if (pathname.startsWith("/finance")) {
    activeItem = "Financeiro";
  } else if (pathname.startsWith("/report")) {
    activeItem = "Relatorio";
  } else if (pathname.startsWith("/config")) {
    activeItem = "Configuracoes";
  }

  return (
    <>
      {mobileOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      <nav className="fixed hidden h-screen flex-col justify-between border-r border-gray-200 bg-white p-4 md:flex md:w-50 lg:w-60 xl:w-70">
        <div>
          <div className="mb-8 flex items-center gap-3 px-2">
            <Building2 size={28} color="#2082B1" strokeWidth={2.5} />
            <h1 className="text-xl font-bold text-gray-800">GestIO</h1>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Cadastros
            </h2>
            <ul className="space-y-1">
              <Link href="/products">
                <NavItem
                  icon={Package}
                  label="Produtos"
                  active={activeItem === "Produtos"}
                />
              </Link>
              <Link href="/clients">
                <NavItem
                  icon={Users}
                  label="Clientes"
                  active={activeItem === "Clientes"}
                />
              </Link>
              <Link href="/users">
                <NavItem
                  icon={Users}
                  label="Usuarios"
                  active={activeItem === "Usuarios"}
                />
              </Link>
            </ul>
          </div>

          <div>
            <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Operacoes
            </h2>
            <ul className="space-y-1">
              <Link href="/dashboard">
                <NavItem
                  icon={LayoutDashboard}
                  label="Dashboard"
                  active={activeItem === "Dashboard"}
                />
              </Link>
              <Link href="/finance">
                <NavItem
                  icon={CircleDollarSign}
                  label="Financeiro"
                  active={activeItem === "Financeiro"}
                />
              </Link>
              <Link href="/report">
                <NavItem
                  icon={FileText}
                  label="Relatorio"
                  active={activeItem === "Relatorio"}
                />
              </Link>
              <Link href="/config">
                <NavItem
                  icon={Settings}
                  label="Configuracoes"
                  active={activeItem === "Configuracoes"}
                />
              </Link>
            </ul>
          </div>
        </div>

        <div className="relative flex items-center gap-3 border-t border-gray-100 px-2 pt-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0DA2E7] font-bold text-white">
            AD
          </div>
          <div className="flex gap-3">
            <div>
              <h3 className="truncate text-sm font-semibold text-gray-800">
                Admin
              </h3>
              <p className="truncate text-xs text-gray-500">
                admin@empresa.com
              </p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

function NavItem({ icon: Icon, label, active }: NavItemProps) {
  return (
    <li>
      <div
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
          active ? "bg-[#2082B1] text-white" : "text-black hover:bg-gray-100"
        }`}
      >
        <Icon size={20} className={active ? "text-white" : "text-black"} />
        <span className="text-sm font-semibold">{label}</span>
      </div>
    </li>
  );
}
