import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductCategory } from "../enums/product-category.enum";
import { User } from "src/users/entities/user.entity";

@Entity('products')
export class Product{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('decimal', { precision: 10, scale: 2, transformer: {
        to: (value: number) => value,
        from: (value: string) => parseFloat(value)
    }})
    price: number;

    @Column('int')
    stock: number;

    @Column({ default:true })
    available: boolean;

    @Column()
    company: string;

    @ManyToOne(() => User, user => user.transactions)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    userId: string;

    @Column({ type: 'enum', enum: ProductCategory, default: ProductCategory.OTHER })
    category: ProductCategory

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}