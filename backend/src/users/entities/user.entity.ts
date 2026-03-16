import { Customer } from 'src/customers/entities/customer.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, UpdateDateColumn } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.SELLER })
    role: UserRole

    @Column({ type: 'enum', enum: UserStatus, default: UserStatus.PENDING, })
    status: UserStatus;

    @Column()
    company: string;

    @Column({ nullable:true })
    phone?: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Product, product => product.user)
    products: Product[];

    @OneToMany(() => Customer, customer => customer.user)
    customers: Customer[];

    @OneToMany(() => Order, order => order.creator)
    orders: Order[];

    @OneToMany(() => Transaction, transaction => transaction.user)
    transactions: Transaction[];   
}

