import { Address } from './address.model';
import { Customer } from './customer.model';
import { OrderItem } from './order-item.model';
import { OrderStatus } from '../enums/order-status.enum';
import { Shop } from './shop.model';
import { Transaction } from './transaction.model';

export class Order {
    Id!: string;
    Shop!: Shop;
    Customer!: Customer;
    Date!: Date;
    Status!: OrderStatus;
    BillingAddress!: Address;
    ShippingAddress!: Address;
    DeliveryMethodId!: string;
    Comments?: string;
    SenderWalletAddress?: string;
    Transaction?: Transaction;
    Items?: OrderItem[];
    CumulativeAmount!: number;
    CumulativeTotal!: number;    
}