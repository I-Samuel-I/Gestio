import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
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
    async create(
        @Body() createCustomerDto: CreateCustomerDto,
        @CurrentUser() user: User
    ){ return this.customersService.create(createCustomerDto, user)}

    @Get()
    async findAll(
        @CurrentUser() user: User,
    ){ return this.customersService.findAll(user.id) }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() data: UpdateCustomerDto,
        @CurrentUser() user: User
    ){ return this.customersService.update(id, data, user.id)}

}
