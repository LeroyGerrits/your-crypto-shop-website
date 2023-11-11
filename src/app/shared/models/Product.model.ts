import { Shop } from "./Shop.model";

export class Product {
    Id!: string;
    Shop!: Shop;
    Name!: string;
    Description?: string;
    Stock?: number;
    Price!: number;
    Visible!: boolean;
}