import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/roles.decorator';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
@UseGuards(AuthGuard('jwt'))
export class CustomersController {

    constructor(private readonly customersService: CustomersService){}

    @Post()
    create(
        @Body() createCustomerDto: CreateCustomerDto,
        @CurrentUser() user: User
    ) { 
        return this.customersService.create(createCustomerDto, user)
    }

    @Get()
    findAll( @CurrentUser() user: User) { 
        return this.customersService.findAll(user) 
    }

    @Get(':id')
    findOne(
        @Param('id') id: string, 
        @CurrentUser() user: User
    ) { 
        return this.customersService.findOne(id, user); 
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCustomerDto: UpdateCustomerDto,
        @CurrentUser() user: User
    ) { 
        return this.customersService.update(id, updateCustomerDto, user)
    }

    @Delete(':id')
    remove(
        @Param('id') id: string, 
        @CurrentUser() user: User   
    ) { 
        return this.customersService.remove(id, user); 
    }
}