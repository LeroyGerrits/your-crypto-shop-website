import { CurrencyType } from "../enums/CurrencyType.enum";

export class Currency {
    Id!: string;
    Type!: CurrencyType;
    Symbol?: string;
    Code!: string;
    Name!: string;    
}