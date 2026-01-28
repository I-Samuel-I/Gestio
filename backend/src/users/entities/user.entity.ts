import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    name:string;

    @Column()
    phone: string;

    @Column()
    companyName: string;
    

    @Column({

        type: 'enum',
        enum: ['admin', 'user'],
        default: 'user',
        
    })
    role: 'admin' | 'user';

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;
}

