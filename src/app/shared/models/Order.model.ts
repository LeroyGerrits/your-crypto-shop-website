import { Address } from './Address.model';
import { Customer } from './Customer.model';
import { OrderItem } from './OrderItem.model';
import { OrderStatus } from '../enums/OrderStatus.enum';
import { Shop } from './Shop.model';
import { Transaction } from './Transaction.model';

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