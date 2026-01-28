import { IsEmail, IsString, IsIn, MinLength } from 'class-validator';

export class CreateUserDto {

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    password: string;

    @IsIn(['admin', 'user'])
    role: 'admin' | 'user';
}