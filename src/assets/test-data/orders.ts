import { Order } from 'src/app/shared/models/order.model';
import { OrderStatus } from 'src/app/shared/enums/order-status.enum';
import { TestDataAddresses } from './addresses';
import { TestDataCustomers } from './customers';
import { TestDataOrderItems } from './order-items';
import { TestDataShops } from './shops';
import { TestDataTransactions } from './tranactions';

export const TestDataOrders: Order[] = [
    {
        Id: '00000000-0000-0000-0000-000000000001',
        Shop: TestDataShops[0],
        Customer: TestDataCustomers[0],
        Date: new Date(),
        Status: OrderStatus.New,
        BillingAddress: TestDataAddresses[0],
        ShippingAddress: TestDataAddresses[0],
        DeliveryMethodId: '00000000-0000-0000-0000-000000000011',
        Comments: 'This is an order',
        SenderWalletAddress: 'wallet123',
        Transaction: TestDataTransactions[0],
        Items: TestDataOrderItems,
        CumulativeAmount: 10,
        CumulativeTotal: 100
    },
    {
        Id: '00000000-0000-0000-0000-000000000002',
        Shop: TestDataShops[0],
        Customer: TestDataCustomers[0],
        Date: new Date(),
        Status: OrderStatus.New,
        BillingAddress: TestDataAddresses[0],
        ShippingAddress: TestDataAddresses[0],
        DeliveryMethodId: '00000000-0000-0000-0000-000000000011',
        Comments: 'This is an order',
        SenderWalletAddress: 'wallet123',
        Transaction: TestDataTransactions[0],
        Items: TestDataOrderItems,
        CumulativeAmount: 10,
        CumulativeTotal: 100
    }
];