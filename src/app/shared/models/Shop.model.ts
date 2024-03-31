import { Country } from "./Country.model";
import { DigiByteWallet } from "./DigiByteWallet.model";
import { ShopCategory } from "./ShopCategory.model";

export class Shop {
    Id!: string;
    MerchantId!: string;
    Name!: string;
    SubDomain?: string;
    Country?: Country;
    Category?: ShopCategory;
    Wallet?: DigiByteWallet;
    Featured!: boolean;
}