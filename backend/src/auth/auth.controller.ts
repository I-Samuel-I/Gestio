import { Controller, Post, Body, Get, Request, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() registerDto: RegisterDto) { return this.authService.register(
        registerDto.email, registerDto.password, registerDto.companyName, registerDto.name, registerDto.phone); }

    @Post('login')
    async login(@Body() loginDto: LoginDto){
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        return this.authService.login(user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    me(@Request() req) {
        return req.user;
    }
}
