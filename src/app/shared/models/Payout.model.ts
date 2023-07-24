import { DigibyteWallet } from "./DigibyteWallet.model";

export class Payout {
    Id!: string;
    Wallet!: DigibyteWallet;
    PayDate!: Date;
}