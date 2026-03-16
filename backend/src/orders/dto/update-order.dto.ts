import { IsBoolean, IsDate, IsEnum, IsOptional, IsString } from "class-validator";
import { OrderStatus } from "../enums/order-status.enum";
import { Type } from "class-transformer";

export class UpdateOrderDto{

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    installedAt?: Date;
}