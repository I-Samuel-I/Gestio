import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ActivitiesService {

    constructor( 
        @InjectRepository(Activity)
        private readonly repository: Repository<Activity>,
    ){}

    async createLog(
        user: User, 
        type: 'customer' | 'transaction' | 'product' | 'order', 
        action: 'create' | 'update' | 'delete' | 'payment' | 'sale', 
        data: any
    ) {

        let title = '';
        let description = '';

        switch (type) {

            case 'customer':

                if (action === 'create') {

                    title = 'New customer registered';
                    description = `${data.name} was added as a customer`;

                } else if (action === 'update') {

                    title = 'Customer updated';
                    description = `Data for ${data.name} has been edited`;

                } else {

                    title = 'Customer removed';
                    description = `The record for ${data.name} was deleted`;
                }
                
                break;

            case 'transaction':

                const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.amount);

                if (action === 'payment') {

                    title = 'Payment received';
                    description = `${formattedAmount} - ${data.description}`;

                } else if (action === 'update') {

                    title = 'Payment edited';
                    description = `Transaction #${data.id.slice(0,4)} was corrected`;

                } else {

                    title = 'Payment removed';
                    description = `The ${formattedAmount} entry was reversed`;

                }

                break;

            case 'order':

                const orderNumber = data.number || 'N/A';
                const clientName = data.customer?.name || 'Customer';

                if (action === 'sale') {

                    title = 'New sale completed';
                    description = `Order #${orderNumber} - ${clientName}`;

                } else if (action === 'update') {

                    title = 'Order updated';
                    description = `Status for order #${orderNumber} has changed to ${data.status}`;

                } else {

                    title = 'Order removed';
                    description = `Order #${orderNumber} was cancelled/deleted`;

                }
                break;

            case 'product':

                if (action === 'create') {

                    title = 'New product added';
                    description = `${data.name} was added to the catalog`;

                } else if (action === 'update') {

                    title = 'Product updated';
                    description = `${data.name} stock or details updated`;

                } else {

                    title = 'Product removed';
                    description = `Product ${data.name} was deleted`;

                }

                break;
        }

        return await this.repository.save({
            title,
            description,
            type,
            company: user.company,
        });
    }

    async findRecent(user:User){

        return await this.repository.find({
            where: { company: user.company },
            order: {createdAt: 'DESC' },
            take: 5
        })
    }
}
