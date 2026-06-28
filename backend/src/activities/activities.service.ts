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

                    title = 'Novo cliente registrado';
                    description = `${data.name} foi adicionado como cliente`;

                } else if (action === 'update') {

                    title = 'Cliente atualizado';
                    description = `Dados de ${data.name} foram editados`;

                } else {

                    title = 'Cliente removido';
                    description = `O registro de ${data.name} foi deletado`;
                }
                
                break;

            case 'transaction':

                const formattedAmount = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.amount);

                if (action === 'payment') {

                    title = 'Pagamento recebido';
                    description = `${formattedAmount} - ${data.description}`;

                } else if (action === 'update') {

                    title = 'Pagamento editado';
                    description = `Transação #${data.id.slice(0,4)} foi corrigida`;

                } else {

                    title = 'Pagamento removido';
                    description = `O lançamento de ${formattedAmount} foi revertido`;

                }

                break;

            case 'order':

                const orderNumber = data.number || 'N/A';
                const clientName = data.customer?.name || 'Cliente';

                if (action === 'sale') {

                    title = 'Nova venda concluída';
                    description = `Pedido #${orderNumber} - ${clientName}`;

                } else if (action === 'update') {

                    title = 'Pedido atualizado';
                    description = `Status do pedido #${orderNumber} foi alterado para ${data.status}`;

                } else {

                    title = 'Pedido removido';
                    description = `Pedido #${orderNumber} foi cancelado/deletado`;

                }
                break;

            case 'product':

                if (action === 'create') {

                    title = 'Novo produto adicionado';
                    description = `${data.name} foi adicionado ao catálogo`;

                } else if (action === 'update') {

                    title = 'Produto atualizado';
                    description = `Estoque ou detalhes de ${data.name} foram atualizados`;

                } else {

                    title = 'Produto removido';
                    description = `Produto ${data.name} foi deletado`;

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
