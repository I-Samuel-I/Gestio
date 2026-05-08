import { Controller,Get, Patch, Param, Body, UseGuards, Delete, Query, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser, Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './enums/user-role.enum';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get('me')
    getProfile(@CurrentUser() user:User){ return user; }

    @Roles(UserRole.MANAGER)
    @Post()
    create(
        @Body() data: CreateUserDto,
        @CurrentUser() user: User,
    ) {
        return this.usersService.create({ ...data, company: user.company });
    }

    @Get()
    findAll(
        @CurrentUser() user: User,
        @Query('search') search?: string,
    ) {
        return this.usersService.findAll(user, search);
    }

    @Get(':id')
    findOne(
        @Param('id') id: string,
        @CurrentUser() user: User
    ) { 
        return this.usersService.findById(id, user); 
    }

    @Roles(UserRole.MANAGER)
    @Patch(':id')
    update( 
        @Param('id') id: string, 
        @Body() data: UpdateUserDto,
        @CurrentUser() user:User
    ) { 
        return this.usersService.update(id, data, user)
    }

    @Roles(UserRole.MANAGER)
    @Delete(':id')
    deactivate(
        @Param('id') id: string,
        @CurrentUser() user: User
    ) { 
        return this.usersService.deactivate(id, user); 
    }
}