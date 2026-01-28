import { IsEmail, IsPhoneNumber, MinLength } from 'class-validator';

export class RegisterDto {
  @IsPhoneNumber('BR', { message: 'O número de celular inválido' })
  phone: string;

  @MinLength(2)
  companyName: string;

  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @MinLength(4)
  password: string;
}
