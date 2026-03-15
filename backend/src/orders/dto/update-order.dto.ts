import { IsBoolean, IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { OrderStatus } from "../enums/order-status.enum";

export class UpdateOrderDto{

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus;

    @IsOptional()
    @IsDateString()
    installed_at?: Date;

    @IsOptional()
    @IsBoolean()
    is_internal?: boolean;

}