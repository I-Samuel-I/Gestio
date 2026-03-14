import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductCategory } from "../enums/product-category.enum";

@Entity('products')
export class Product{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column()
    stock: number;

    @Column({ default:true })
    available: boolean;

    @Column({
        type: 'enum',
        enum: ProductCategory,
        default: ProductCategory.OTHER
    })
    category: ProductCategory

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}