export class CurrencyRate {
    Id!: string;
    CurrencyFromId!: string;
    CurrencyToId!: string;
    Rate!: number;
    InvertedRate!: number;
    Date!: Date;
}