import { IsBoolean, IsOptional } from 'class-validator';

export class UpdatePreferencesDto {

    @IsOptional()
    @IsBoolean({ message: 'Notificações por email deve ser verdadeiro ou falso.' })
    emailNotifications?: boolean;

    @IsOptional()
    @IsBoolean({ message: 'Alerta de estoque baixo deve ser verdadeiro ou falso.' })
    lowStockAlert?: boolean;

    @IsOptional()
    @IsBoolean({ message: 'Resumo diário deve ser verdadeiro ou falso.' })
    dailySummary?: boolean;
}