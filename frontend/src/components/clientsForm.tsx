import { useEffect, useState, type FormEvent } from "react";
import Input from "./input";
import { PostClients, UpdateClient, type Client } from "@/services/clients";

type ClientsFormProps = {
    onClose?: () => void;
    onCreated?: () => void;
    initialClient?: Client | null;
    submitText?: string;
};

type ClientFormState = {
    name: string;
    document_type: "CPF" | "CNPJ";
    document: string;
    email: string;
    phone: string;
    state: string;
    city: string;
    address: string;
    status: "active" | "inactive" | "pending";
    total_purchases: number;
};

const BRAZILIAN_STATES = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP", "SE", "TO",
] as const;

function getInitialClientState(client?: Client | null): ClientFormState {
    return {
        name: client?.name ?? "",
        document_type: client?.document_type ?? "CPF",
        document: client?.document ?? "",
        email: client?.email ?? "",
        phone: client?.phone ?? "",
        state: client?.state ?? "SP",
        city: client?.city ?? "",
        address: client?.address ?? "",
        status: client?.status ?? "active",
        total_purchases: Number(client?.total_purchases ?? 0),
    };
}

export default function ClientsForm({
    onClose,
    onCreated,
    initialClient,
    submitText,
}: ClientsFormProps) {
    const [client, setClient] = useState<ClientFormState>(
        getInitialClientState(initialClient),
    );

    useEffect(() => {
        setClient(getInitialClientState(initialClient));
    }, [initialClient]);

    const handleSubmitClient = async (e: FormEvent) => {
        e.preventDefault();

        const saved = initialClient
            ? await UpdateClient(
                initialClient.id,
                client.name,
                client.document_type,
                client.document,
                client.email,
                client.phone,
                client.state,
                client.city,
                client.address,
                client.status,
                client.total_purchases,
            )
            : await PostClients(
                client.name,
                client.document_type,
                client.document,
                client.email,
                client.phone,
                client.state,
                client.city,
                client.address,
                client.status,
                client.total_purchases,
            );

        if (saved) {
            onCreated?.();
            onClose?.();
        }
    };

    return (
        <form onSubmit={handleSubmitClient}>
            <div className="grid grid-cols-2 gap-5">
                <Input
                    label="Nome Completo"
                    placeholder="Ex: Maria Silva"
                    minLength={3}
                    value={client.name}
                    onChange={(e) =>
                        setClient({ ...client, name: e.target.value })
                    }
                />

                <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-sm font-medium text-slate-700">Tipo de Documento</label>
                    <select
                        className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 outline-none transition-all focus:border-[#2082B1] focus:ring-1 focus:ring-[#2082B1]/10"
                        value={client.document_type}
                        onChange={(e) =>
                            setClient({
                                ...client,
                                document_type: e.target.value as "CPF" | "CNPJ",
                            })
                        }
                    >
                        <option value="CPF">CPF</option>
                        <option value="CNPJ">CNPJ</option>
                    </select>
                </div>

                <Input
                    label="Documento"
                    placeholder={client.document_type === "CPF" ? "Somente numeros do CPF" : "Somente numeros do CNPJ"}
                    value={client.document}
                    minLength={client.document_type === "CPF" ? 11 : 14}
                    maxLength={client.document_type === "CPF" ? 11 : 14}
                    onChange={(e) =>
                        setClient({ ...client, document: e.target.value })
                    }
                />

                <Input
                    label="Email"
                    type="email"
                    placeholder="email@exemplo.com"
                    value={client.email}
                    onChange={(e) =>
                        setClient({ ...client, email: e.target.value })
                    }
                />

                <Input
                    label="Telefone"
                    placeholder="83 9 9999-9999"
                    minLength={11}
                    maxLength={11}
                    value={client.phone}
                    onChange={(e) =>
                        setClient({ ...client, phone: e.target.value })
                    }
                />

                <Input
                    label="Cidade"
                    placeholder="Ex: Sao Paulo"
                    minLength={2}
                    maxLength={100}
                    value={client.city}
                    onChange={(e) =>
                        setClient({ ...client, city: e.target.value })
                    }
                />

                <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-sm font-medium text-slate-700">Estado</label>
                    <select
                        className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 outline-none transition-all focus:border-[#2082B1] focus:ring-1 focus:ring-[#2082B1]/10"
                        value={client.state}
                        onChange={(e) =>
                            setClient({ ...client, state: e.target.value })
                        }
                    >
                        {BRAZILIAN_STATES.map((state) => (
                            <option key={state} value={state}>
                                {state}
                            </option>
                        ))}
                    </select>
                </div>

                <Input
                    label="Endereco"
                    placeholder="Rua, numero e complemento"
                    value={client.address}
                    minLength={5}
                    maxLength={100}
                    onChange={(e) =>
                        setClient({ ...client, address: e.target.value })
                    }
                />

                <Input
                    label="Total em Compras"
                    type="number"
                    value={client.total_purchases}
                    onChange={(e) =>
                        setClient({
                            ...client,
                            total_purchases: Number(e.target.value),
                        })
                    }
                />
            </div>

            <div className="mt-5 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Status</label>
                <select
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 outline-none transition-all focus:border-[#2082B1] focus:ring-1 focus:ring-[#2082B1]/10"
                    value={client.status}
                    onChange={(e) =>
                        setClient({
                            ...client,
                            status: e.target.value as "active" | "inactive" | "pending",
                        })
                    }
                >
                    <option value="active">Ativo</option>
                    <option value="pending">Pendente</option>
                    <option value="inactive">Inativo</option>
                </select>
            </div>

            <div className="flex justify-end gap-3 mt-10">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 rounded-lg border hover:cursor-pointer border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 rounded-lg text-white font-medium bg-[#2082B1] hover:bg-[#1a6a8f] hover:cursor-pointer transition-colors"
                >
                    {submitText ?? (initialClient ? "Salvar" : "Adicionar")}
                </button>
            </div>
        </form>
    );
}
