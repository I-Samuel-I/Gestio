import { Customer } from 'src/customers/entities/customer.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';

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


    @Column()
    companyName: string;
    

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.SELLER
    })
    role: UserRole

    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.PENDING,
    })
    status: UserStatus;

    @Column({nullable:true})
    company?: string;

    @Column({nullable:true})
    phone?: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Customer, customer => customer.user)
    customers: Customer[];

    @OneToMany(() => Order, order => order.creator)
    orders: Order[];

    
}

