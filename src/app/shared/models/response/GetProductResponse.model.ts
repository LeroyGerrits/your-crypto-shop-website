import { IDictionaryString } from "../../interfaces/idictionary-string.interface";
import { Product } from "../-product.model";

export class GetProductResponse {
    Product!: Product;
    CategoryIds?: string[];
    FieldData?: IDictionaryString;
}