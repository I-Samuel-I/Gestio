import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {

    @IsString({ message: 'Nome deve ser um texto.' })
    @MinLength(3, { message: 'Nome deve ter pelo menos 3 caracteres.' })
    name: string;

    @IsEmail({}, { message: 'Email inválido.' })
    email: string;

    @IsString({ message: 'Senha deve ser um texto.' })
    @MinLength(4, { message: 'Senha deve ter pelo menos 4 caracteres.' })
    password: string;

    @IsOptional()
    @IsString({ message: 'Telefone deve ser um texto.' })
    @MinLength(11, { message: 'Telefone deve ter pelo menos 11 caracteres.' })
    phone?: string;

    @IsString({ message: 'Empresa deve ser um texto.' })
    @MinLength(4, { message: 'Empresa deve ter pelo menos 4 caracteres.' })
    company: string;
}