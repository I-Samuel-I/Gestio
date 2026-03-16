import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CurrentUser } from 'src/auth/roles.decorator';
import { User } from 'src/users/entities/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService){}

    @Post()
    async create(
        @Body() createProductDto: CreateProductDto,
        @CurrentUser() user: User
    ) { 
        return this.productsService.create(createProductDto, user); 
    }

    @Get()
    async findAll(@CurrentUser() user: User) { 
        return this.productsService.findAll(user); 
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
        @CurrentUser() user:User
    ) { 
        return this.productsService.findOne(id, user); 
    }
        
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
        @CurrentUser() user:User
    ){ return this.productsService.update(id, updateProductDto, user) }

    @Delete(':id')
    async remove(
        @Param('id') id: string,
        @CurrentUser() user:User
    ) { 
        return this.productsService.remove(id, user) 
    }
}
