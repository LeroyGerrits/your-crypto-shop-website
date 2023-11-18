import { Product } from "../Product.model";

export class MutateProductRequest {
    Product!: Product;
    CheckedCategories?: string;
}