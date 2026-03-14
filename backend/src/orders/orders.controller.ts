import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { CurrentUser } from 'src/auth/roles.decorator';
import { User } from 'src/users/entities/user.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('orders')
export class OrdersController {

    constructor(private readonly ordersService: OrdersController){}

    @Post()
    create(@Body() createOrderDto: CreateOrderDto, @CurrentUser() user: User) { return this.ordersService.create(createOrderDto, user); }

    @Get()
    findAll() { return this.ordersService.findAll(); }

    @Get(':id')
    findOne(@Param('id') id: string) { return this.ordersService.findOne(id); }

    @Patch(':id')
    update(
    @Param('id') id: string,
        @Body() updateOrderDto: UpdateOrderDto
    ) { return this.ordersService.update(id, updateOrderDto);} 

    @Delete(':id')
    remove(@Param('id') id: string) { return this.ordersService.remove(id); }

}
