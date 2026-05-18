import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";
import { ProductCategory } from "../enums/product-category.enum";
import { Type } from "class-transformer";

export class CreateProductDto{

    @IsString({ message: 'Nome deve ser um texto.' })
    @IsNotEmpty({ message: 'Nome é obrigatório.' })
    name: string;

    @Type(() => Number)
    @IsNumber({}, { message: 'Preço deve ser um número.' })
    @IsPositive({ message: 'Preço deve ser maior que zero.' })
    price: number;

    @Type(() => Number)
    @IsNumber({}, { message: 'Estoque deve ser um número.' })
    @Min(0, { message: 'Estoque não pode ser negativo.' })
    stock: number;

    @IsOptional()
    @IsBoolean({ message: 'Disponível deve ser verdadeiro ou falso.' })
    available?: boolean;

    @IsEnum(ProductCategory, { message: 'Categoria inválida.' })
    category: ProductCategory;
}