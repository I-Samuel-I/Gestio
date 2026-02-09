"use client";
import { Bell, LogOut, Menu, Search } from "lucide-react";
import { useState } from "react";

type HeaderProps = {
  title: string;
  onMenuClick: () => void;
};

export default function Header({ title, onMenuClick }: HeaderProps) {

  return (
    <header className="flex h-fit w-full items-center justify-between p-5 bg-white shadow-sm">
      <h1 className=" sm:text-2xl font-semibold text-slate-800">{title}</h1>

      <article className="flex items-center gap-3 sm:gap-6">
        <div className="hidden relative sm:flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar..."
            className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#2082B1] outline-none w-64 transition-all"
          />
        </div>
        <button className=" md:hidden" onClick={onMenuClick} >
          <Menu className="text-slate-500 hover:text-[#0DA2E7] hover:bg-[#E7F6FE] rounded-full transition-colors hover:cursor-pointer w-6 h-6" />
        </button>
        <button className="relative p-2 text-slate-500 hover:text-[#0DA2E7] hover:bg-[#E7F6FE] rounded-full transition-colors hover:cursor-pointer">
          <Bell className="w-6 h-6" />
          {/* <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white">
                        2
                    </span> */}
        </button>
        <button className="p-2 text-slate-500 hover:text-[#0DA2E7] hover:cursor-pointer hover:bg-[#E7F6FE] rounded-full transition-colors">
          <LogOut className="w-6 h-6" />
        </button>
      </article>
    </header>
  );
}
