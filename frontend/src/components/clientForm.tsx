import { useState } from "react";
import Input from "./input";

export default function ClientForm() {

    const [client, setClient] = useState({
        name: "",
        email: "",
        phone: "",
        cpf: "",
        address: "",
        city: "",
        state: "",
    });

    return (
        <form>
            <div className="grid grid-cols-2 gap-5">
                <Input
                    label="Nome Completo"
                    placeholder="Ex: Maria Silva"
                    value={client.name}
                    onChange={(e) =>
                        setClient({ ...client, name: e.target.value })
                    }
                />

                <Input
                    label="Email"
                    type="text"
                    placeholder="email@exemplo.com"
                    value={client.email}
                    onChange={(e) => setClient({ ...client, email: e.target.value })}
                />

                <Input
                    label="Telefone"
                    type="number"
                    placeholder="(11) 9 9999-9999"
                    value={client.phone}
                    onChange={(e) => setClient({ ...client, phone: e.target.value })}
                />

                <Input
                    label="Endereço"
                    type="number"
                    value={client.address}
                    onChange={(e) => setClient({ ...client, address: e.target.value })}
                />
                <Input
                    label="Cidade"
                    type="text"
                    value={client.city}
                    onChange={(e) => setClient({ ...client, city: e.target.value })}
                />
                <Input
                    label="Estado"
                    type="text"
                    value={client.state}
                    onChange={(e) => setClient({ ...client, state: e.target.value })}
                />
                <Input
                    label="Status"
                    type="select"
                    placeholder="Selecione"
                />
            </div>
        </form>
    )
}