import { IsBoolean, IsNotEmpty, IsString, IsUUID, MinLength } from "class-validator";

export class CreateOrderDto{

    @IsString({ message: 'Título deve ser um texto.' })
    @IsNotEmpty({ message: 'Título é obrigatório.' })
    title: string;

    @IsString({ message: 'Descrição deve ser um texto.' })
    @MinLength(5, { message: 'Descrição deve ter pelo menos 5 caracteres.' })
    description: string;

    @IsUUID('4', { message: 'Cliente inválido.' })
    customerId: string;
}