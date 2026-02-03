import { useState } from "react";
import Input from "./input";

export default function ProductForm() {

    const [product, setProduct] = useState({
        name: "",
        category: "",
        price: 0,
        stock: 0,
        status: ""
    });

    return (
        <form>
            <div className="grid grid-cols-2 gap-5">
                <Input
                    label="Nome do Produto"
                    placeholder="Ex: Produto Premium A"
                    value={product.name}
                    onChange={(e) =>
                        setProduct({ ...product, name: e.target.value })
                    }
                />

                <Input
                    label="Categoria"
                    type="select"
                    placeholder="Selecione"
                    value={product.category}
                />

                <Input
                    label="Preço (R$)"
                    type="number"
                    value={product.price}
                />

                <Input
                    label="Estoque"
                    type="number"
                    value={product.stock}
                />
            </div>
        </form>
    )
}