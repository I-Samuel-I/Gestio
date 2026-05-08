import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateCompanyDto {

    @IsOptional()
    @IsString()
    @Length(3, 100)
    name?: string;

    @IsOptional()
    @IsString()
    @Length(14, 14, { message: 'CNPJ deve ter 14 dígitos' })
    cnpj?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    phone?: string;
}