import { IsBoolean, IsIn, IsOptional } from 'class-validator';

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
    @IsOptional()
    @IsIn(['pt-BR', 'en-US'], { message: 'Idioma deve ser pt-BR ou en-US.' })
    language?: string;

    @IsOptional()
    @IsIn(['America/Sao_Paulo', 'America/New_York'], {
        message: 'Fuso horario deve ser America/Sao_Paulo ou America/New_York.',
    })
    timezone?: string;
}