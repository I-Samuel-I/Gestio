import Input from "./input";

export default function UserForm() {

    return (
        <form>
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                    <Input
                        label="Nome Completo"
                        placeholder="Ex: João da Silva"
                    />
                    <Input
                        label="Email"
                        type="text"
                        placeholder="email@empresa.com"
                    />
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <Input
                        label="Senha"
                        type="password"
                        placeholder="Digite uma senha segura"
                    />
                    <Input
                        label="Confirme a Senha"
                        type="password"
                        placeholder="Digite a senha novamente"
                    />
                    <Input
                        label="Função"
                        type="select"
                        placeholder="Selecione"
                    />
                    <Input
                        label="Status"
                        type="select"
                        placeholder="Selecione"
                    />
                </div>
            </div>
        </form>
    )
}
