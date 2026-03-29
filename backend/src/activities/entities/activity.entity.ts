import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('activities')
export class Activity {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        type: 'enum',
        enum: ['customer', 'transaction', 'product', 'order']
    })
    type: string;

    @Column()
    company: string;

    @CreateDateColumn()
    createdAt: Date;
}