import { Merchant } from "./Merchant.model";

export class Shop {
    Id!: string;    
    Merchant!: Merchant;
    Name!: string;
    SubDomain?: string;
}