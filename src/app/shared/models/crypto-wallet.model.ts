import { Currency } from "./currency.model";

export class CryptoWallet {
    Id!: string;
    MerchantId!: string;
    Currency!: Currency;
    Name!: string;
    Address!: string;
}