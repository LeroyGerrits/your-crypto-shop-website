import { Currency } from './currency.model';
import { FinancialStatementTransactionType } from '../enums/financial-statement-transaction-type.enum';
import { Recurrance } from '../enums/recurrance.enum';

export class FinancialStatementTransaction {
    Id!: string;
    Type!: FinancialStatementTransactionType;
    Date!: Date;
    Currency!: Currency;
    Amount!: number;
    Recurrance!: Recurrance;
    Description!: string;
}