import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @MinLength(3)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    password: string;

    @IsOptional()
    @IsString()
    @MinLength(11)
    phone?: string;

    @IsString()
    @MinLength(4)
    company: string
}