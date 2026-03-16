import { IsEnum, IsNumber, IsString, IsDateString, IsDate, IsPositive } from "class-validator";
import { TransactionType } from "../enums/transaction-type.enum";
import { TransactionCategory } from "../enums/transaction-category.enum";
import { Type } from "class-transformer";

export class CreateTransactionDto {

    @IsEnum(TransactionType)
    type: TransactionType;

    @IsNumber()
    @IsPositive()
    amount: number;

    @IsString()
    description: string;

    @IsEnum(TransactionCategory)
    category: TransactionCategory;

    @Type(() => Date)
    @IsDate()
    date: Date;
}