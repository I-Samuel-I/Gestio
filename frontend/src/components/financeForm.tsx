import Input from "./input";

export default function FinanceForm() {

    return (
        <form>
            <div className="flex flex-col gap-5">
                <Input
                    label="Vincular Produto (opcional)"
                    placeholder="Selecione um Produto"
                />
                <Input
                    label="Valor (R$)"
                    type="select"
                    placeholder="0,00"
                />

                <Input
                    label="Descrição"
                    type="text"
                    placeholder="Ex: Venda#1234 - Cliente XYZ"
                />
                <Input
                    label="Categoria"
                    type="select"
                    placeholder="Selecione uma categoria"
                />

            </div>
        </form>
    )
}
