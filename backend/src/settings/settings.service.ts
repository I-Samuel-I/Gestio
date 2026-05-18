import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { UserPreferences } from './entities/user-preferences.entity';
import { User } from 'src/users/entities/user.entity';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';
import { Customer } from 'src/customers/entities/customer.entity';
import { Product } from 'src/products/entities/product.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Activity } from 'src/activities/entities/activity.entity';

@Injectable()
export class SettingsService {

    constructor(
        @InjectRepository(Company)
        private readonly companyRepo: Repository<Company>,
        @InjectRepository(UserPreferences)
        private readonly preferencesRepo: Repository<UserPreferences>,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        @InjectRepository(Customer)
        private readonly customerRepo: Repository<Customer>,
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
        @InjectRepository(Order)
        private readonly orderRepo: Repository<Order>,
        @InjectRepository(Transaction)
        private readonly transactionRepo: Repository<Transaction>,
        @InjectRepository(Activity)
        private readonly activityRepo: Repository<Activity>,
    ){}

    async getCompany(user: User) {

        const company = await this.companyRepo.findOne({ where: { name: user.company }});
        if (!company) { throw new NotFoundException('Empresa não encontrada.') };
        return company;
    }

    async updateCompany(user: User, dto: UpdateCompanyDto) {

        const company = await this.getCompany(user);
        const previousName = company.name;
        Object.assign(company, dto);

        if (dto.name) {
            company.name = dto.name.trim().toUpperCase();
        }

        const updatedCompany = await this.companyRepo.save(company);

        if (company.name !== previousName) {
            const nextCompanyName = company.name;

            await Promise.all([
                this.userRepo.update({ company: previousName }, { company: nextCompanyName }),
                this.customerRepo.update({ company: previousName }, { company: nextCompanyName }),
                this.productRepo.update({ company: previousName }, { company: nextCompanyName }),
                this.orderRepo.update({ company: previousName }, { company: nextCompanyName }),
                this.transactionRepo.update({ company: previousName }, { company: nextCompanyName }),
                this.activityRepo.update({ company: previousName }, { company: nextCompanyName }),
            ]);
        }

        return updatedCompany;
    }

    async getPreferences(user: User) {

        let preferences = await this.preferencesRepo.findOne({ where: { userId: user.id }});

        if (!preferences) {

            preferences = this.preferencesRepo.create({ user });
            await this.preferencesRepo.save(preferences);
        }

        return preferences;
    }

    async updatePreferences(user: User, dto: UpdatePreferencesDto) {
        
        const preferences = await this.getPreferences(user);
        Object.assign(preferences, dto);
        return this.preferencesRepo.save(preferences);
    }
}