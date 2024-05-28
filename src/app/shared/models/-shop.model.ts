import { Country } from "./-country.model";
import { DigiByteWallet } from "./digibyte-wallet.model";
import { ShopCategory } from "./shop-category.model";
import { ShopOrderMethod } from "../enums/shop-order-method.enum";

export class Shop {
    Id!: string;
    MerchantId!: string;
    Name!: string;
    SubDomain?: string;
    Country?: Country;
    Category?: ShopCategory;
    Wallet?: DigiByteWallet;
    OrderMethod!: ShopOrderMethod;
    RequireAddresses!: boolean;
    Featured!: boolean;
}