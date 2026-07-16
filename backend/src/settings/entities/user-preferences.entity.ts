import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";

@Entity('user_preferences')
export class UserPreferences {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ name: 'user_id' })
    userId: string;

    @Column({ default: false })
    emailNotifications: boolean;

    @Column({ default: false })
    lowStockAlert: boolean;

    @Column({ default: false })
    dailySummary: boolean;

    @Column({ default: 'pt-BR' })
    language: string;

    @Column({ default: 'America/Sao_Paulo' })
    timezone: string;
}