import { Category } from './Category.model';
import { ProductPhoto } from './ProductPhoto.model';
import { Shop } from './Shop.model';

export class Product {
    Id!: string;
    Shop!: Shop;
    Name!: string;
    Description?: string;
    Price!: number;
    Categories?: Category[];
    Photos?: ProductPhoto[];
}