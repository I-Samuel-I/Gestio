import { IsEnum, IsNumber, IsString, IsDate, IsPositive, IsOptional, IsUUID } from "class-validator";
import { TransactionType } from "../enums/transaction-type.enum";
import { TransactionCategory } from "../enums/transaction-category.enum";
import { Transform } from "class-transformer";

export class CreateTransactionDto {

    @Transform(({ value }) => {
        if (typeof value !== 'string') {
            return value;
        }

        const normalized = value.trim().toLowerCase();
        if (normalized === 'entrada') {
            return TransactionType.INCOME;
        }

        const noAccent = normalized
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '');

        if (noAccent === 'saida') {
            return TransactionType.EXPENSE;
        }

        return value;
    })
    @IsEnum(TransactionType, { message: 'Tipo de transação inválido.' })
    type: TransactionType;

    @IsNumber({}, { message: 'Valor deve ser um número.' })
    @IsPositive({ message: 'Valor deve ser maior que zero.' })
    amount: number;

    @IsString({ message: 'Descrição deve ser um texto.' })
    description: string;

    @IsEnum(TransactionCategory, { message: 'Categoria inválida.' })
    category: TransactionCategory;

    @Transform(({ value }) => {
        if (typeof value === 'string') {
            const trimmed = value.trim();
            if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
                const [year, month, day] = trimmed.split('-').map(Number);
                return new Date(year, month - 1, day);
            }
        }

        return value instanceof Date ? value : new Date(value);
    })
    @IsDate({ message: 'Data inválida.' })
    date: Date;

    @IsOptional()
    @IsUUID('4', { message: 'Produto inválido.' })
    productId?: string;

    @IsOptional()
    @IsNumber({}, { message: 'Quantidade deve ser um número.' })
    @IsPositive({ message: 'Quantidade deve ser maior que zero.' })
    quantity?: number;
}