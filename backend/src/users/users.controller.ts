import { Controller,Get, Patch, Param, Body, UseGuards, Delete} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser, Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './enums/user-role.enum';
import { User } from './entities/user.entity';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get('me')
    getProfile(@CurrentUser() user:User){ return user; }

    @Get()
    findAll() { return this.usersService.findAll(); }

    @Get(':id')
    findOne(@Param('id') id: string){ return this.usersService.findById(id); }

    @Roles(UserRole.ADMIN)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() data: UpdateUserDto,

    ){ return this.usersService.update(id, data)}

    @Roles(UserRole.ADMIN)
    @Delete(':id')
    deactivate(@Param('id') id: string){ return this.usersService.deactivate(id); }
}
