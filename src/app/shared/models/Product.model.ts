import { Category } from "./Category.model";
import { Shop } from "./Shop.model";

export class Product {
    Id!: string;
    Shop!: Shop;
    Name!: string;
    Description?: string;
    Price!: number;
    Categories?: Category[];
}