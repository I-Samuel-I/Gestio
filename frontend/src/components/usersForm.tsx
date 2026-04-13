import { useEffect, useState, type FormEvent } from "react";
import Input from "./input";
import { PostUsers, UpdateUser, type User } from "@/services/users";

type UsersFormProps = {
    onClose?: () => void;
    onCreated?: () => void;
    initialUser?: User | null;
    submitText?: string;
};

type UserFormState = {
    name: string;
    email: string;
    password: string;
    phone: string;
    company: string;
};

function getInitialUserState(user?: User | null): UserFormState {
    return {
        name: user?.name ?? "",
        email: user?.email ?? "",
        password: "",
        phone: user?.phone ?? "",
        company: user?.company ?? user?.companyName ?? "",
    };
}

export default function UsersForm({
    onClose,
    onCreated,
    initialUser,
    submitText,
}: UsersFormProps) {
    const [user, setUser] = useState<UserFormState>(
        getInitialUserState(initialUser),
    );

    useEffect(() => {
        setUser(getInitialUserState(initialUser));
    }, [initialUser]);

    const handleSubmitUser = async (e: FormEvent) => {
        e.preventDefault();

        const saved = initialUser
            ? await UpdateUser(
                initialUser.id,
                user.name,
                user.email,
                user.phone,
                user.company,
                user.password,
            )
            : await PostUsers(
                user.name,
                user.email,
                user.password,
                user.phone,
                user.company,
            );

        if (saved) {
            onCreated?.();
            onClose?.();
        }
    };

    return (
        <form onSubmit={handleSubmitUser}>
            <div className="flex flex-col gap-5">
                <Input
                    label="Nome Completo"
                    placeholder="Ex: Joao da Silva"
                    value={user.name}
                    onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                    }
                />

                <Input
                    label="Email"
                    type="email"
                    placeholder="email@empresa.com"
                    value={user.email}
                    onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                    }
                />

                <div className="grid grid-cols-2 gap-5">
                    <Input
                        label="Telefone"
                        placeholder="11999998888"
                        value={user.phone}
                        onChange={(e) =>
                            setUser({ ...user, phone: e.target.value })
                        }
                    />
                    <Input
                        label="Empresa"
                        placeholder="Nome da empresa"
                        value={user.company}
                        onChange={(e) =>
                            setUser({ ...user, company: e.target.value })
                        }
                    />
                </div>

                <Input
                    label={initialUser ? "Nova Senha" : "Senha"}
                    type="password"
                    placeholder={
                        initialUser
                            ? "Deixe em branco para manter a atual"
                            : "Digite uma senha segura"
                    }
                    value={user.password}
                    onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                    }
                />
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
                    {submitText ?? (initialUser ? "Salvar" : "Adicionar")}
                </button>
            </div>
        </form>
    );
}
