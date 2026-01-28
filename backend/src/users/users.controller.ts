import { Controller,Get, Post, Patch, Param, Body, UseGuards, ParseIntPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post()
    @Roles('admin')
    create(@Body() data:CreateUserDto) { return this.usersService.create(data) }

    @Patch(':id')
    @Roles('admin')
    update(@Param('id', ParseIntPipe) id:number, @Body() data:UpdateUserDto) { return this.usersService.update(id, data) }

    @Roles('admin', 'user')
    @Get()
    findAll() { return this.usersService.findAll();}

    @Roles('admin', 'user')
    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) { return this.usersService.findById(id);}

    @Patch(':id/deactivate')
    @Roles('admin')
    deactivate(@Param('id', ParseIntPipe) id:number) { return this.usersService.deactivate(id)}
}
