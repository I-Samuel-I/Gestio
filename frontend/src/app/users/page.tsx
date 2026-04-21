"use client";

import ModalForm from "@/components/modalForm";
import Header from "@/components/header";
import Input from "@/components/input";
import Modal from "@/components/modal";
import Navbar from "@/components/sidebar";
import { authUser } from "@/services/auth";
import { DeleteUser, GetUsers, type User as AppUser } from "@/services/users";
import { Ellipsis, Filter, Mail, Search, Shield, TriangleAlert, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CreateButtonForm from "@/components/createButtonForm";

type UserStatus = AppUser["status"];
type UserRole = AppUser["role"];

const statusMeta: Record<UserStatus, { label: string; className: string }> = {
    active: { label: "Ativo", className: "bg-green-100 text-green-700" },
    inactive: { label: "Inativo", className: "bg-red-100 text-red-700" },
    pending: { label: "Pendente", className: "bg-yellow-100 text-yellow-700" },
};

const roleMeta: Record<UserRole, { label: string; className: string }> = {
    admin: {
        label: "Administrador",
        className: "bg-red-100 text-red-700 border border-[#F5C2C2]",
    },
    supervisor: {
        label: "Supervisor",
        className: "bg-blue-100 text-blue-700 border border-[#BAD8E6]",
    },
    seller: {
        label: "Vendas",
        className: "bg-green-100 text-green-700 border border-[#C0EED1]",
    },
    support: {
        label: "Suporte",
        className: "bg-orange-100 text-orange-700 border border-[#FBE4BA]",
    },
    financial: {
        label: "Financeiro",
        className: "bg-purple-100 text-purple-700 border border-[#E8D0F4]",
    },
};

export default function Users() {
    const [open, setOpen] = useState(false);
    const [navMobile, setNavMobile] = useState(false);
    const [users, setUsers] = useState<AppUser[]>([]);
    const [search, setSearch] = useState("");
    const [openMenuId, setOpenMenuId] = useState<AppUser["id"] | null>(null);
    const [selectedUser, setSelectedUser] = useState<AppUser | null>(null);
    const [userToDelete, setUserToDelete] = useState<AppUser | null>(null);
    const [currentUserRole, setCurrentUserRole] = useState<UserRole | null>(null);

    const canManageUsers = currentUserRole === "admin";

    const filterUsers = users.filter((user) =>
        `${user.name} ${user.email} ${user.company ?? user.companyName ?? ""}`
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()));

    const loadUsers = async () => {
        const data = await GetUsers();
        setUsers(data ?? []);
    };

    const handleOpenCreateModal = () => {
        setSelectedUser(null);
        setOpen(true);
    };

    const handleOpenEditModal = (user: AppUser) => {
        setSelectedUser(user);
        setOpen(true);
        setOpenMenuId(null);
    };

    const handleCloseUserModal = () => {
        setOpen(false);
        setSelectedUser(null);
    };

    const handleOpenDeleteModal = (user: AppUser) => {
        setUserToDelete(user);
        setOpenMenuId(null);
    };

    const handleConfirmDelete = async () => {
        if (!userToDelete) return;

        const deleted = await DeleteUser(userToDelete.id);

        if (deleted) {
            await loadUsers();
            setUserToDelete(null);
        }
    };

    const formatUserId = (id: string) => String(id).slice(0, 8).toUpperCase();

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        GetUsers().then((data) => {
            setUsers(data ?? []);
        });

        const token = localStorage.getItem("token");

        if (!token) return;

        authUser(token).then((data) => {
            setCurrentUserRole(data?.role ?? null);
        });
    }, []);

    useEffect(() => {
        if (openMenuId === null) return;

        const handleClickOutSide = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenuId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutSide);

        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        };
    }, [openMenuId]);

    return (
        <main className="flex min-h-screen bg-slate-50">
            <Navbar
                mobileOpen={navMobile}
                onClose={() => setNavMobile(false)}
            />
            <div className="flex flex-col flex-1 md:ml-50 lg:ml-70">
                <Header title="Usuarios" onMenuClick={() => setNavMobile(true)} />
                <div className="p-6 md:p-8 space-y-6">
                    <section className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">Usuarios</h1>
                            <p className="text-slate-500">
                                Gerencie seus usuarios.
                            </p>
                        </div>
                        <CreateButtonForm onClick={handleOpenCreateModal} text="Novo Usuario" />

                        <Modal isOpen={open} onClose={handleCloseUserModal}>
                            <ModalForm
                                icon={<User size={45} color="#2082B1" />}
                                type="user"
                                title={selectedUser ? "Editar Usuario" : "Novo Usuario"}
                                subTitle={
                                    selectedUser
                                        ? "Atualize os dados do usuario selecionado"
                                        : "Adicione um novo usuario a sua base"
                                }
                                onClose={handleCloseUserModal}
                                onCreated={loadUsers}
                                user={selectedUser}
                                submitText={selectedUser ? "Salvar" : "Adicionar"}
                            />
                        </Modal>

                        <Modal
                            isOpen={Boolean(userToDelete)}
                            onClose={() => setUserToDelete(null)}
                        >
                            <div className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="rounded-xl bg-red-50 p-3 text-red-600">
                                        <TriangleAlert size={28} />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-slate-800">Excluir usuario</h2>
                                        <p className="mt-2 text-sm text-slate-500">
                                            Tem certeza que deseja excluir{" "}
                                            <span className="font-semibold text-slate-700">
                                                {userToDelete?.name}
                                            </span>
                                            ? Essa acao nao pode ser desfeita.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setUserToDelete(null)}
                                        className="px-6 py-2 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors cursor-pointer"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleConfirmDelete}
                                        className="px-6 py-2 rounded-lg text-white font-medium bg-red-600 hover:bg-red-700 transition-colors cursor-pointer"
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        </Modal>
                    </section>

                    <section className="flex flex-col sm:flex-row gap-4">
                        <Input
                            type="text"
                            placeholder="Buscar por nome, email ou empresa..."
                            icon={Search}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 transition font-medium">
                            <Filter className="w-4 h-4" />
                            Buscar
                        </button>
                    </section>

                    {users.length === 0 ? (
                        <section className="col-span-full flex text-center mt-20 items-center gap-5 flex-col w-full">
                            <div className="p-6 bg-[#E1EDF2] rounded-3xl w-fit animate-[floatUpDown_6s_ease-in-out_infinite]">
                                <User color="#2082B1" size={50} />
                            </div>
                            <div className="flex flex-col items-center">
                                <h3 className="text-2xl font-bold text-slate-800">Nenhum usuario cadastrado</h3>
                                <p className="text-sm mt-2 text-slate-500 w-3/4">
                                    Adicione seu primeiro usuario para organizar acessos e operacoes da equipe.
                                </p>
                            </div>

                            <CreateButtonForm onClick={handleOpenCreateModal} text="Novo Usuario" />
                        </section>
                    ) : (
                        <>
                            <section className="hidden md:block bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                                <div className="w-full overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                                                <th className="p-4">Usuario</th>
                                                <th className="p-4">Funcao</th>
                                                <th className="p-4">Status</th>
                                                <th className="p-4">Empresa</th>
                                                {canManageUsers && <th className="p-4 text-right">Acoes</th>}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filterUsers.map((user) => (
                                                <tr key={user.id} className="hover:bg-slate-50 transition">
                                                    <td className="p-4">
                                                        <div className="flex flex-col">
                                                            <p className="font-medium">{user.name}</p>
                                                            <span className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                                                                <Mail size={14} />
                                                                <span>{user.email}</span>
                                                            </span>
                                                            <span className="text-xs text-slate-400 font-mono uppercase tracking-tighter mt-1">
                                                                ID:{formatUserId(user.id)}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className={`flex items-center gap-2 w-fit px-4 rounded-2xl text-sm font-medium ${roleMeta[user.role].className}`}>
                                                            <Shield size={16} />
                                                            <span className="font-medium">{roleMeta[user.role].label}</span>
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className={`px-2 py-1 rounded text-sm font-medium ${statusMeta[user.status].className}`}>
                                                            {statusMeta[user.status].label}
                                                        </span>
                                                    </td>

                                                    <td className="p-4">
                                                        <p className="text-slate-500">{user.company ?? user.companyName ?? "-"}</p>
                                                    </td>

                                                    {canManageUsers && (
                                                        <td className="p-4">
                                                            <div className="relative flex justify-end">
                                                                <button
                                                                    onClick={() =>
                                                                        setOpenMenuId((currentId) =>
                                                                            currentId === user.id ? null : user.id,
                                                                        )
                                                                    }
                                                                    className="p-2 rounded-lg hover:bg-blue-50 hover:text-red cursor-pointer transition-colors"
                                                                >
                                                                    <Ellipsis className="w-5 h-5" />
                                                                </button>

                                                                {openMenuId === user.id && (
                                                                    <div ref={menuRef} className="absolute right-0 top-11 z-10 w-48 bg-white border border-slate-200 rounded-lg shadow-lg">
                                                                        <button
                                                                            onClick={() => handleOpenEditModal(user)}
                                                                            className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                                                                        >
                                                                            Editar
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleOpenDeleteModal(user)}
                                                                            className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100"
                                                                        >
                                                                            Excluir
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            <section className="grid grid-cols-1 gap-4 md:hidden">
                                {filterUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        className="bg-white rounded-xl shadow-sm p-4 space-y-3"
                                    >
                                        <div className="relative">
                                            {canManageUsers && (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            setOpenMenuId((currentId) =>
                                                                currentId === user.id ? null : user.id,
                                                            )
                                                        }
                                                        className="absolute top-0 right-0 p-2 rounded-lg hover:bg-blue-50 hover:text-red cursor-pointer transition-colors"
                                                    >
                                                        <Ellipsis className="w-5 h-5" />
                                                    </button>

                                                    {openMenuId === user.id && (
                                                        <div ref={menuRef} className="absolute right-0 top-11 z-10 w-48 bg-white border border-slate-200 rounded-lg shadow-lg">
                                                            <button
                                                                onClick={() => handleOpenEditModal(user)}
                                                                className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                                                            >
                                                                Editar
                                                            </button>
                                                            <button
                                                                onClick={() => handleOpenDeleteModal(user)}
                                                                className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100"
                                                            >
                                                                Excluir
                                                            </button>
                                                        </div>
                                                    )}
                                                </>
                                            )}

                                            <div>
                                                <p className="font-semibold text-slate-800">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    ID: {formatUserId(user.id)}
                                                </p>
                                                <span className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                                                    <Mail size={14} />
                                                    <span>{user.email}</span>
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <h2>Perfil:</h2>
                                            <div className="flex gap-2 mt-1 flex-wrap">
                                                <span className={`flex items-center gap-2 w-fit px-4 rounded-2xl text-sm font-medium ${roleMeta[user.role].className}`}>
                                                    <Shield size={16} />
                                                    <span className="font-medium">{roleMeta[user.role].label}</span>
                                                </span>
                                                <span className={`px-2 py-1 rounded text-sm font-medium ${statusMeta[user.status].className}`}>
                                                    {statusMeta[user.status].label}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <h2>Empresa:</h2>
                                            <p className="text-slate-500">{user.company ?? user.companyName ?? "-"}</p>
                                        </div>
                                    </div>
                                ))}
                            </section>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}