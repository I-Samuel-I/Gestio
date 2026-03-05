import { Controller,Get, Patch, Param, Body, UseGuards, ParseIntPipe, Request, Delete} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get('me')
    getProfile(@Request() req:any){ return this.usersService.findById(req.user.userId); }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll() { return this.usersService.findAll(); }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id:number){ return this.usersService.findById(id); }

    @Roles(UserRole.ADMIN)
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id:number,
        @Body() data: UpdateUserDto,

    ){ return this.usersService.update(id, data)}

    @Roles(UserRole.ADMIN)
    @Delete(':id')
    deactivate(@Param('id', ParseIntPipe) id:number){ return this.usersService.deactivate(id); }
}
