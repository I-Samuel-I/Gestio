import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CustomerDocument } from "../enums/customer-document.enum";
import { BrazilianStates } from "../enums/brazilian-state.enum";
import { CustomerStatus } from "../enums/customer-status.enum";
import { User } from "src/users/entities/user.entity";
import { Order } from "src/orders/entities/order.entity";

@Entity('customers')
export class Customer{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: CustomerDocument })
    document_type: CustomerDocument;

    @Column({ unique:true })
    document: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column({ type: 'enum', enum: BrazilianStates })
    state: BrazilianStates;

    @Column()
    city: string;

    @Column()
    address: string;

    @Column()
    company: string;

    @Column({ type: 'enum', enum: CustomerStatus, default: CustomerStatus.INACTIVE })
    status: CustomerStatus;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    total_purchases: number;

    @ManyToOne(() => User, user => user.customers)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ name: 'user_id' }) 
    userId: string;

    @OneToMany(() => Order, order => order.customer)
    orders: Order[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}