import { OrderItemType } from '../enums/OrderItemType.enum';

export class OrderItem {
    Id?: string;
    OrderId!: string;
    Type!: OrderItemType;
    ProductId?: string;
    ProductCode?: string;
    ProductName?: string;
    ProductPrice?: number;
    Description!: string;
    Amount!: number;
    Price!: number;
    Total!: number;
}