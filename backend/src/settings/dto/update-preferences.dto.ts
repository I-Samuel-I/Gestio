import { IsBoolean, IsOptional } from 'class-validator';

export class UpdatePreferencesDto {

    @IsOptional()
    @IsBoolean()
    emailNotifications?: boolean;

    @IsOptional()
    @IsBoolean()
    lowStockAlert?: boolean;

    @IsOptional()
    @IsBoolean()
    dailySummary?: boolean;
}