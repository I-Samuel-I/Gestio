import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";
import { ProductCategory } from "../enums/product-category.enum";
import { Type } from "class-transformer";

export class CreateProductDto{

    @IsString()
    @IsNotEmpty()
    name: string;

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    price: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    stock: number;

    @IsOptional()
    @IsBoolean()
    available?: boolean;

    @IsEnum(ProductCategory)
    category: ProductCategory;
}