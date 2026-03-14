import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderStatus } from "../enums/order-status.enum";
import { User } from "src/users/entities/user.entity";
import { Customer } from "src/customers/entities/customer.entity";
import { OrderType } from "../enums/order-type.enum";

@Entity('orders')
export class Order{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, length: 10 })
    number: string;

    @Column({ length: 100 })
    title: string;

    @Column()
    description: string;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.OPEN
    })
    status: OrderStatus;

    @Column({ type: "timestamp", nullable: true })
    installed_at: Date;

    @Column({
        type: 'enum',
        enum: OrderType,
        default: OrderType.CUSTOMER
    })
    type: OrderType

    @ManyToOne(() => Customer, (customer) => customer.orders, { nullable: true })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @Column()
    customer_id: string;

    @ManyToOne(() => User, (user) => user.orders, { nullable: false })
    @JoinColumn({ name: 'creator_id' })
    creator: User;

    @Column()
    creator_id: string;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date;

}