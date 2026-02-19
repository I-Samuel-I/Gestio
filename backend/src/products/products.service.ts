import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
    ){}

    async create(createProductdto: CreateProductDto){

        const product = this.productsRepository.create(createProductdto);
        return await this.productsRepository.save(product);

    }

    async findAll(){

        return await this.productsRepository.find({ order: { created_at: 'DESC' }})

    }

    async findOne(id: number){

        const product = await this.productsRepository.findOne({ where: { id } });

        if (!product){ throw new NotFoundException('Product not found') }

        return product;

    }


    async update(id: number, updateProductDto: UpdateProductDto){

        const product = await this.findOne(id);

        Object.assign(product, updateProductDto);

        return await this.productsRepository.save(product)

    }

    async remove(id: number){

        const product = await this.findOne(id);
        await this.productsRepository.remove(product);

    }


}
