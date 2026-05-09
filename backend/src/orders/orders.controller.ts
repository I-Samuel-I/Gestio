import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { CurrentUser } from 'src/auth/roles.decorator';
import { User } from 'src/users/entities/user.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '@nestjs/passport';
import { OrdersService } from './orders.service';

@UseGuards(AuthGuard('jwt'))
@Controller('orders')
export class OrdersController {

    constructor(private readonly ordersService: OrdersService){}

    @Post()
    create(
        @Body() createOrderDto: CreateOrderDto, 
        @CurrentUser() user: User
    ) { 
        return this.ordersService.create(createOrderDto, user); 
    }

    @Get()
    findAll(
        @CurrentUser() user: User,
        @Query('search') search?: string,
    ) {
        return this.ordersService.findAll(user, search);
    }

    @Get(':id')
    findOne(
        @Param('id') id: string,
        @CurrentUser() user: User
    ) { 
        return this.ordersService.findOne(id, user); 
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateOrderDto: UpdateOrderDto,
        @CurrentUser() user: User
    ) { 
        return this.ordersService.update(id, updateOrderDto, user);
    } 

    @Delete(':id')
    remove(
        @Param('id') id: string,
        @CurrentUser() user: User
    ) { 
        return this.ordersService.remove(id, user); 
    }
}
