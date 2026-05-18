import { IsBoolean, IsDate, IsEnum, IsOptional, IsString } from "class-validator";
import { OrderStatus } from "../enums/order-status.enum";
import { Type } from "class-transformer";

export class UpdateOrderDto{

    @IsOptional()
    @IsString({ message: 'Descrição deve ser um texto.' })
    description?: string;

    @IsOptional()
    @IsEnum(OrderStatus, { message: 'Status inválido.' })
    status?: OrderStatus;

    @IsOptional()
    @Type(() => Date)
    @IsDate({ message: 'Data de instalação inválida.' })
    installedAt?: Date;
}