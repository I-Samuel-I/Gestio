import { IsBoolean, IsNotEmpty, IsString, IsUUID, MinLength } from "class-validator";

export class CreateOrderDto{

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @MinLength(5)
    description: string;

    @IsBoolean()
    is_internal: boolean;

    @IsUUID()
    customer_id: string;
}