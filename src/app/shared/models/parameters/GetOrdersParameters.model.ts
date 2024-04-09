import { OrderStatus } from "../../enums/OrderStatus.enum";

export class GetOrdersParameters {
    ShopId?: string;
    CustomerId?: string;
    Customer?: string;
    DateFrom?: Date;
    DateUntil?: Date;
    Status?: OrderStatus;
}