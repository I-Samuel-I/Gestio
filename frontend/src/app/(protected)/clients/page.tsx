"use client";

import ModalForm from "@/components/modalForm";
import Header from "@/components/header";
import Input from "@/components/input";
import Modal from "@/components/modal";
import Navbar from "@/components/sidebar";
import {
  DeleteClient,
  GetClients,
  type Client,
} from "@/services/clients";
import {
  Ellipsis,
  Filter,
  Mail,
  MapPin,
  Phone,
  Search,
  TriangleAlert,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CreateButtonForm from "@/components/createButtonForm";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

const statusMeta: Record<
  Client["status"],
  { label: string; className: string }
> = {
  ativo: { label: "Ativo", className: "bg-green-100 text-green-700" },
  pendente: { label: "Pendente", className: "bg-yellow-100 text-yellow-700" },
  inativo: { label: "Inativo", className: "bg-red-100 text-red-700" },
};

export default function Clients() {
  const [open, setOpen] = useState(false);
  const [navMobile, setNavMobile] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [openMenuId, setOpenMenuId] = useState<Client["id"] | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const router = useRouter();

  const filterClients = clients.filter((client) =>
    `${client.name} ${client.email} ${client.document}`
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase()));

  const loadClients = async () => {
    const data = await GetClients();
    setClients(data ?? []);
  };

  const handleOpenCreateModal = () => {
    setSelectedClient(null);
    setOpen(true);
  };

  const handleOpenEditModal = (client: Client) => {
    setSelectedClient(client);
    setOpen(true);
    setOpenMenuId(null);
  };

  const handleCloseClientModal = () => {
    setOpen(false);
    setSelectedClient(null);
  };

  const handleOpenDeleteModal = (client: Client) => {
    setClientToDelete(client);
    setOpenMenuId(null);
  };

  const handleConfirmDelete = async () => {
    if (!clientToDelete) return;

    const deleted = await DeleteClient(clientToDelete.id);

    if (deleted) {
      await loadClients();
      setClientToDelete(null);
    }
  };

  const formatClientId = (id: string) => String(id).slice(0, 8).toUpperCase();

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    const syncClients = async () => {
      const data = await GetClients();

      if (isMounted) {
        setClients(data ?? []);
      }
    };

    void syncClients();

    return () => {
      isMounted = false;
    };
  }, [router]);

  useEffect(() => {
    if (openMenuId === null) return;

    const handleClickOutSide = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("click", handleClickOutSide);

    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [openMenuId]);

  return (
    <motion.main
      className="flex min-h-screen bg-slate-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Navbar
        mobileOpen={navMobile}
        onClose={() => setNavMobile(false)}
      />

      <div className="flex flex-col flex-1 md:ml-50 lg:ml-70">
        <Header title="Clientes" onMenuClick={() => setNavMobile(true)} />

        <div className="p-6 md:p-8 space-y-6">
          <motion.section
            className="flex flex-col sm:flex-row justify-between items-start gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Clientes</h1>
              <p className="text-slate-500">
                Gerencie sua base de clientes.
              </p>
            </div>
            <CreateButtonForm onClick={handleOpenCreateModal} text="Novo Cliente" />

            <AnimatePresence>
              {open && (
                <Modal isOpen={open} onClose={handleCloseClientModal}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ModalForm
                      icon={<User size={45} color="#2082B1" />}
                      type="client"
                      title={selectedClient ? "Editar Cliente" : "Novo Cliente"}
                      subTitle={
                        selectedClient
                          ? "Atualize os dados do cliente selecionado"
                          : "Adicione um novo cliente a sua base"
                      }
                      onClose={handleCloseClientModal}
                      onCreated={loadClients}
                      client={selectedClient}
                      submitText={selectedClient ? "Salvar" : "Adicionar"}
                    />
                  </motion.div>
                </Modal>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {clientToDelete && (
                <Modal
                  isOpen={Boolean(clientToDelete)}
                  onClose={() => setClientToDelete(null)}
                >
                  <motion.div
                    className="p-6"
                    initial={{ opacity: 0, scale: 0.95, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="rounded-xl bg-red-50 p-3 text-red-600">
                        <TriangleAlert size={28} />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-slate-800">Excluir cliente</h2>
                        <p className="mt-2 text-sm text-slate-500">
                          Tem certeza que deseja excluir{" "}
                          <span className="font-semibold text-slate-700">
                            {clientToDelete?.name}
                          </span>
                          ? Essa acao nao pode ser desfeita.
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setClientToDelete(null)}
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
                  </motion.div>
                </Modal>
              )}
            </AnimatePresence>
          </motion.section>

          <motion.section
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Input
              type="text"
              placeholder="Buscar por nome, email ou documento..."
              icon={Search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 transition font-medium">
              <Filter className="w-4 h-4" />
              Buscar
            </button>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {clients.length === 0 ? (
              <section className="col-span-full flex text-center mt-20 items-center gap-5 flex-col w-full">
              <div className="p-6 bg-[#E1EDF2] rounded-3xl w-fit animate-[floatUpDown_6s_ease-in-out_infinite]">
                <User color="#2082B1" size={50} />
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-bold text-slate-800">Nenhum cliente cadastrado</h3>
                <p className="text-sm mt-2 text-slate-500 w-3/4">
                  Comece adicionando seu primeiro cliente para acompanhar contatos e compras.
                </p>
              </div>

                <CreateButtonForm onClick={handleOpenCreateModal} text="Novo Cliente" />
              </section>
            ) : (
              <>
                <section className="hidden md:block bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                        <th className="p-4">Cliente</th>
                        <th className="p-4">Contato</th>
                        <th className="p-4">Documento</th>
                        <th className="p-4">Localizacao</th>
                        <th className="p-4">Status</th>
                      
                        <th className="p-4 text-right">Ações</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filterClients.map((client) => (
                        <tr
                          key={client.id}
                          className="hover:bg-slate-50 transition"
                        >
                          <td className="p-4">
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {client.name}
                              </span>
                              <span className="text-sm text-slate-500">
                                ID: {formatClientId(client.id)}
                              </span>
                            </div>
                          </td>

                          <td className="p-4">
                            <div className="flex flex-col gap-1">
                              <span className="flex items-center gap-2">
                                <Mail size={16} />
                                {client.email}
                              </span>
                              <span className="flex items-center gap-2 text-sm text-slate-500">
                                <Phone size={16} />
                                {client.phone}
                              </span>
                            </div>
                          </td>

                          <td className="p-4">
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {client.document}
                              </span>
                              <span className="text-sm text-slate-500">
                                {client.document_type}
                              </span>
                            </div>
                          </td>

                          <td className="p-4">
                            <span className="flex items-center gap-2">
                              <MapPin size={16} />
                              {client.city}, {client.state}
                            </span>
                          </td>

                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-sm font-medium ${statusMeta[client.status].className}`}>
                              {statusMeta[client.status].label}
                            </span>
                          </td>

                    

                          <td className="p-4">
                            <div
                              ref={openMenuId === client.id ? menuRef : null}
                              className="relative flex justify-end"
                            >
                              <button
                                onClick={() =>
                                  setOpenMenuId((currentId) =>
                                    currentId === client.id ? null : client.id,
                                  )
                                }
                                className="p-2 rounded-lg hover:bg-blue-50 hover:text-red cursor-pointer transition-colors"
                              >
                                <Ellipsis className="w-5 h-5" />
                              </button>

                              {openMenuId === client.id && (
                                <div className="absolute right-0 bottom-0 z-10 w-48 bg-white border border-slate-200 rounded-lg shadow-lg">
                                  <button
                                    onClick={() => handleOpenEditModal(client)}
                                    className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                                  >
                                    Editar
                                  </button>
                                  <button
                                    onClick={() => handleOpenDeleteModal(client)}
                                    className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100"
                                  >
                                    Excluir
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

                <section className="grid grid-cols-1 gap-4 md:hidden">
                {filterClients.map((client) => (
                  <div
                    key={client.id}
                    className="bg-white rounded-xl shadow-sm p-4 space-y-3"
                  >
                    <div
                      ref={openMenuId === client.id ? menuRef : null}
                      className="relative"
                    >
                      <button
                        onClick={() =>
                          setOpenMenuId((currentId) =>
                            currentId === client.id ? null : client.id,
                          )
                        }
                        className="absolute top-0 right-0 p-2 rounded-lg hover:bg-blue-50 hover:text-red cursor-pointer transition-colors"
                      >
                        <Ellipsis className="w-5 h-5" />
                      </button>

                      {openMenuId === client.id && (
                        <div className="absolute right-0 top-11 z-10 w-48 bg-white border border-slate-200 rounded-lg shadow-lg">
                          <button
                            onClick={() => handleOpenEditModal(client)}
                            className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleOpenDeleteModal(client)}
                            className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100"
                          >
                            Excluir
                          </button>
                        </div>
                      )}

                      <div>
                        <p className="font-semibold text-slate-800">
                          {client.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          ID: {formatClientId(client.id)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1 text-sm">
                      <span className="flex items-center gap-2">
                        <Mail size={14} />
                        {client.email}
                      </span>
                      <span className="flex items-center gap-2 text-slate-500">
                        <Phone size={14} />
                        {client.phone}
                      </span>
                    </div>

                    <div className="text-sm text-slate-600">
                      <p className="font-medium">{client.document_type}: {client.document}</p>
                    </div>

                    <div>
                      <span className="flex items-center gap-2 text-sm">
                        <MapPin size={14} />
                        {client.city}, {client.state}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${statusMeta[client.status].className}`}>
                        {statusMeta[client.status].label}
                      </span>

                    
                    </div>
                  </div>
                ))}
                </section>
              </>
            )}
          </motion.section>
        </div>
      </div>
    </motion.main>
  );
}
