import { DigibyteWallet } from "./DigibyteWallet.model";

export class Transaction {
    Id!: string;
    SenderWallet!: DigibyteWallet;
    RecipientWallet!: DigibyteWallet;
    Amount!: number;
    Fee!: number;
    Date!: Date;
}