import { IDictionaryString } from "../../interfaces/idictionary-string.interface";
import { Product } from "../Product.model";

export class GetProductResponse {
    Product!: Product;
    CategoryIds?: string[];
    FieldData?: IDictionaryString;
}