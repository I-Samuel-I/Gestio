import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsPositive, IsString, Length, Matches, MaxLength, Min, MinLength, ValidateIf } from "class-validator";
import { CustomerDocument } from "../enums/customer-document.enum";
import { BrazilianStates } from "../enums/brazilian-state.enum";
import { CustomerStatus } from "../enums/customer-status.enum";

export class CreateCustomerDto{

    @IsString()
    @MinLength(3, { message: 'Name must have at least 3 characters' })
    name: string;

    @IsEnum(CustomerDocument, {
        message: 'Document type must be CPF or CNPJ',
    })
    document_type: CustomerDocument;

    @ValidateIf(o => o.document_type === CustomerDocument.CPF)
    @Matches(/^\d{11}$/, {
        message: 'CPF must contain 11 digits'
    })

    @ValidateIf(o => o.document_type === CustomerDocument.CNPJ)
    @Matches(/^\d{14}$/, {
        message: 'CNPJ must contain 14 digits'
    })

    @IsNotEmpty()
    document: string;

    @IsEmail()
    email: string;

    @Length(10, 11)
    @IsNumberString()
    phone: string;

    @IsEnum(BrazilianStates, {
        message: 'State must be a valid brazilian UF'
    })
    state: BrazilianStates;

    @IsString()
    @MinLength(2, { message: 'City must have at least 2 characters' })
    @MaxLength(100, { message: 'City is too long' })
    city: string;

    @IsString()
    @MinLength(5, { message: 'Address must have at least 5 characters' })
    @MaxLength(100, { message: 'Address is too long' })
    address: string;

    @IsEnum(CustomerStatus, {
        message: 'Invalid status'
    })
    status: CustomerStatus;

    @IsNumber()
    @Min(0, {message: 'Total purchases cannot be negative.'})
    total_purchases: number;

}