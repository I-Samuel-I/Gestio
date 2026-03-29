import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from 'src/users/entities/user.entity';
import { ActivitiesService } from 'src/activities/activities.service';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
        private readonly activitiesService: ActivitiesService,
    ){}

    async create(createProductdto: CreateProductDto, user:User){

        const product = await this.productsRepository.save({
            ...createProductdto,
            company: user.company,
            userId: user.id
        });

        await this.activitiesService.createLog(user, 'product', 'create', product);

        return product;
    }

    async findAll(user:User){

        console.log(`Buscando produtos para a empresa: ${user.company}`);
        
        return this.productsRepository.find({ 
            where: { company: user.company },
            order: { created_at: 'DESC' }}
        )
    }

    async findOne(id: string, user:User){

        const product = await this.productsRepository.findOne({ where: { id, company: user.company } });

        if (!product){ throw new NotFoundException('Product not found in your company.') }

        return product;
    }

    async update(id: string, updateProductDto: UpdateProductDto, user:User){

        const product = await this.productsRepository.findOne({ where: {id, company: user.company }});

        if (!product) { throw new NotFoundException('Product not found in your company.'); }

        Object.assign(product, updateProductDto);

        const updatedProduct = await this.productsRepository.save(product);

        await this.activitiesService.createLog(user, 'product', 'update', updatedProduct);

        return updatedProduct;
    }

    async remove(id: string, user:User){

        const product = await this.productsRepository.findOne({ where: {id, company: user.company}});

        if (!product) { throw new NotFoundException('Product not found.'); }

        await this.productsRepository.delete(id);

        await this.activitiesService.createLog(user, 'product', 'delete', product);

        return { message: 'Product deleted successfully.' };
    }
}
