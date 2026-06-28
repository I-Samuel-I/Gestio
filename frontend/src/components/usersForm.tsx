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
    const [formError, setFormError] = useState("");

    useEffect(() => {
        setUser(getInitialUserState(initialUser));
        setFormError("");
    }, [initialUser]);

    const handleSubmitUser = async (e: FormEvent) => {
        e.preventDefault();

        if (user.phone && user.phone.length < 11) {
            setFormError("Telefone deve ter pelo menos 11 digitos.");
            return;
        }

        setFormError("");

        try {
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
        } catch (error) {
            setFormError(
                error instanceof Error ? error.message.replace("Error: ", "") : "Nao foi possivel salvar o usuario.",
            );
        }
    };

    return (
        <form onSubmit={handleSubmitUser}>
            <div className="flex flex-col gap-5">
                <Input
                    label="Nome Completo"
                    placeholder="Ex: Joao da Silva"
                    required
                    value={user.name}
                    onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                    }
                />

                <Input
                    label="Email"
                    type="email"
                    placeholder="email@empresa.com"
                    required
                    value={user.email}
                    onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                    }
                />

                <div className="grid grid-cols-2 gap-5">
                    <Input
                        label="Telefone"
                        placeholder="11999998888"
                        type="text"
                        minLength={11}
                        maxLength={11}
                        required
                        value={user.phone}
                        onChange={(e) =>
                            setUser({ ...user, phone: e.target.value.replace(/\D/g, "") })
                        }
                    />
                    <Input
                        label="Empresa"
                        placeholder="Nome da empresa"
                        required
                        value={user.company}
                        onChange={(e) =>
                            setUser({ ...user, company: e.target.value })
                        }
                    />
                </div>

                <Input
                    label={initialUser ? "Nova Senha" : "Senha"}
                    type="password"
                    required={!initialUser}
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

                {formError && (
                    <p className="text-sm font-medium text-red-600">{formError}</p>
                )}
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
