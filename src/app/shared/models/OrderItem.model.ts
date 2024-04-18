import { OrderItemType } from '../enums/OrderItemType.enum';

export class OrderItem {
    Id?: string;
    OrderId!: string;
    Type!: OrderItemType;
    ProductId!: string;
    Description!: string;
    Amount!: number;
    Price!: number;
    Total!: number;
}