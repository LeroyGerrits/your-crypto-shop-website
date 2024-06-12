import { OrderStatus } from "../../enums/order-status.enum";

export class GetOrdersParameters {
    ShopId?: string;
    CustomerId?: string;
    Customer?: string;
    DateFrom?: Date;
    DateUntil?: Date;
    Status?: OrderStatus;
}