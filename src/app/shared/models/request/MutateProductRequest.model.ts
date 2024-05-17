import { IDictionaryString } from "../../interfaces/idictionary-string.interface";
import { Product } from "../Product.model";

export class MutateProductRequest {
    Product!: Product;
    CheckedCategories?: string;
    FieldData?: IDictionaryString;
}