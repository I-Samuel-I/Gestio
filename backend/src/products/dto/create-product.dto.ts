import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";
import { ProductCategory } from "../enums/product-category.enum";

export class CreateProductDto{

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsNumber()
    @Min(0)
    stock: number;

    @IsBoolean()
    available: boolean;

    @IsEnum(ProductCategory)
    category: ProductCategory;

}