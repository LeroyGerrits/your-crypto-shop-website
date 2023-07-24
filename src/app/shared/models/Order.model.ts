import { Customer } from "./Customer.model";
import { Shop } from "./Shop.model";

export class Order {
    Id!: string;
    Shop!: Shop;
    Customer!: Customer;
    OrderDate!: Date;
    PayDate?: Date;
    ShipmentDate?: Date;
}