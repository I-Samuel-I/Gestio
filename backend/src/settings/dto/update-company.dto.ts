import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateCompanyDto {

    @IsOptional()
    @IsString({ message: 'Nome deve ser um texto.' })
    @Length(3, 100, { message: 'Nome deve ter entre 3 e 100 caracteres.' })
    name?: string;

    @IsOptional()
    @IsString()
    @Length(14, 14, { message: 'CNPJ deve ter 14 dígitos' })
    cnpj?: string;

    @IsOptional()
    @IsEmail({}, { message: 'Email inválido.' })
    email?: string;

    @IsOptional()
    @IsString({ message: 'Telefone deve ser um texto.' })
    phone?: string;
}