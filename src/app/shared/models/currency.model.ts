import { CurrencyType } from "../enums/currency-type.enum";

export class Currency {
    Id!: string;
    Type!: CurrencyType;
    Symbol?: string;
    Code!: string;
    Name!: string;
    Supported!: boolean;
}