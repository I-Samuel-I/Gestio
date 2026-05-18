import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsPositive, IsString, Length, Matches, MaxLength, Min, MinLength, ValidateIf } from "class-validator";
import { CustomerDocument } from "../enums/customer-document.enum";
import { BrazilianStates } from "../enums/brazilian-state.enum";
import { CustomerStatus } from "../enums/customer-status.enum";

export class CreateCustomerDto{

    @IsString()
    @MinLength(3, { message: 'Nome deve ter pelo menos 3 caracteres' })
    name: string;

    @IsEnum(CustomerDocument, { message: 'Tipo de documento deve ser CPF ou CNPJ', })
    document_type: CustomerDocument;

    @IsString()
    @Matches(/^\d{11}$|^\d{14}$/, { message: 'Documento deve conter 11 dígitos (CPF) ou 14 dígitos (CNPJ)' })
    @IsNotEmpty()
    document: string;

    @IsEmail()
    email: string;

    @Length(10, 11)
    @IsNumberString()
    phone: string;

    @IsEnum(BrazilianStates, { message: 'Estado deve ser uma UF brasileira válida' })
    state: BrazilianStates;

    @IsString()
    @MinLength(2, { message: 'Cidade deve ter pelo menos 2 caracteres' })
    @MaxLength(100, { message: 'Cidade é muito longa' })
    city: string;

    @IsString()
    @MinLength(5, { message: 'Endereço deve ter pelo menos 5 caracteres' })
    @MaxLength(100, { message: 'Endereço é muito longo' })
    address: string;

    @IsEnum(CustomerStatus, { message: 'Status inválido' })
    status: CustomerStatus;
}