import { Product } from "./Product.model";

export class ProductPhoto {
    Id!: string;
    Product!: Product;
    Description?: string;
    ThumbnailUrl!: string;
    PhotoUrl!: string;
    SortOrder?: number;
}