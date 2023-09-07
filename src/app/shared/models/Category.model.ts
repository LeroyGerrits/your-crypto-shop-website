import { Shop } from './Shop.model';

export class Category {
    Id!: string;
    Shop!: Shop;
    Parent?: Category;
    Name!: string;
    SortOrder?: number;
    Children?: Category[];
}