import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser, Roles } from 'src/auth/roles.decorator';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UserRole } from 'src/users/enums/user-role.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('customers')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CustomersController {

    constructor(private readonly customersService: CustomersService){}

    @Post()
    @Roles(UserRole.MANAGER, UserRole.SUPERVISOR, UserRole.SELLER)
    create(
        @Body() createCustomerDto: CreateCustomerDto,
        @CurrentUser() user: User
    ) { 
        return this.customersService.create(createCustomerDto, user)
    }

    @Get()
    findAll(
        @CurrentUser() user: User,
        @Query('search') search?: string,
    ) {
        return this.customersService.findAll(user, search);
    }

    @Get(':id')
    findOne(
        @Param('id') id: string, 
        @CurrentUser() user: User
    ) { 
        return this.customersService.findOne(id, user); 
    }

    @Patch(':id')
    @Roles(UserRole.MANAGER, UserRole.SUPERVISOR, UserRole.SELLER)
    update(
        @Param('id') id: string,
        @Body() updateCustomerDto: UpdateCustomerDto,
        @CurrentUser() user: User
    ) { 
        return this.customersService.update(id, updateCustomerDto, user)
    }

    @Delete(':id')
    @Roles(UserRole.MANAGER, UserRole.SUPERVISOR)
    remove(
        @Param('id') id: string, 
        @CurrentUser() user: User   
    ) { 
        return this.customersService.remove(id, user); 
    }
}