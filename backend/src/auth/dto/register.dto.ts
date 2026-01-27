import { IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
    
    @IsEmail()
    email: string;

    @MinLength(4)
    password: string;
}
