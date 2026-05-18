import { Injectable, NotFoundException } from '@nestjs/common';
import { Brackets, Repository } from 'typeorm';
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

    async findAll(user:User, search?: string){

        const query = this.productsRepository
            .createQueryBuilder('product')
            .where('product.company = :company', { company: user.company });

        const searchTerm = search?.trim();

        if (searchTerm) {
            query.andWhere(
                new Brackets((qb) => {
                    qb.where('product.name ILIKE :search', { search: `%${searchTerm}%` })
                        .orWhere('CAST(product.category AS TEXT) ILIKE :search', { search: `%${searchTerm}%` });
                }),
            );
        }

        return query.orderBy('product.created_at', 'DESC').getMany();
    }

    async findOne(id: string, user:User){

        const product = await this.productsRepository.findOne({ where: { id, company: user.company } });

        if (!product){ throw new NotFoundException('Produto não encontrado na sua empresa.') }

        return product;
    }

    async update(id: string, updateProductDto: UpdateProductDto, user:User){

        const product = await this.productsRepository.findOne({ where: {id, company: user.company }});

        if (!product) { throw new NotFoundException('Produto não encontrado na sua empresa.'); }

        Object.assign(product, updateProductDto);

        const updatedProduct = await this.productsRepository.save(product);

        await this.activitiesService.createLog(user, 'product', 'update', updatedProduct);

        return updatedProduct;
    }

    async remove(id: string, user:User){

        const product = await this.productsRepository.findOne({ where: {id, company: user.company}});

        if (!product) { throw new NotFoundException('Produto não encontrado.'); }

        await this.productsRepository.delete(id);

        await this.activitiesService.createLog(user, 'product', 'delete', product);

        return { message: 'Produto excluído com sucesso.' };
    }
}
