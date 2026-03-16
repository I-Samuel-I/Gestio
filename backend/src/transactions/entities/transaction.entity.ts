import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TransactionType } from "../enums/transaction-type.enum";
import { TransactionCategory } from "../enums/transaction-category.enum";
import { User } from "src/users/entities/user.entity";

@Entity('transactions')
export class Transaction {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @Column('decimal', { precision: 10, scale: 2, transformer: {
        to: (v: number) => v,
        from: (v: string) => parseFloat(v),
    }})
    amount: number;

    @Column({ type: 'date' })
    date: Date;

    @Column({ type: 'enum', enum: TransactionType })
    type: TransactionType;

    @Column({ type: 'enum', enum: TransactionCategory })
    category: TransactionCategory;

    @Column()
    company: string;

    @ManyToOne(() => User, user => user.transactions)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ name: 'user_id' })
    userId: string;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}