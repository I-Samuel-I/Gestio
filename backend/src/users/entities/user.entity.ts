import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export enum UserRole {
    
    ADMIN = 'admin',
    SUPERVISOR = 'supervisor',
    SELLER = 'seller',
    SUPPORT = 'support',
    FINANCIAL = 'financial',
}

export enum UserStatus {

    ACTIVE = 'active',
    INACTIVE = 'inactive',
    PENDING = 'pending'

}

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

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
}

