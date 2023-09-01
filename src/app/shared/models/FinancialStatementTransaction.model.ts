import { Currency } from './Currency.model';
import { FinancialStatementTransactionType } from '../enums/FinancialStatementTransactionType.enum';
import { Recurrance } from '../enums/Recurrance.enum';

export class FinancialStatementTransaction {
    Id!: string;
    Type!: FinancialStatementTransactionType;
    Date!: Date;
    Currency!: Currency;
    Amount!: number;
    Recurrance!: Recurrance;
    Description!: string;
}