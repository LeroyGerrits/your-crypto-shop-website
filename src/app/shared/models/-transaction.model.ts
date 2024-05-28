export class Transaction {
    Id!: string;
    ShopId!: string;
    Date!: Date;
    Recipient!: string;
    AmountDue!: number;
    AmountPaid!: number;
    PaidInFull?: Date;
    Tx?: string;
}