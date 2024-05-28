import { OrderItem } from 'src/app/shared/models/order-item.model';
import { OrderItemType } from 'src/app/shared/enums/order-item-type.enum';

export const TestDataOrderItems: OrderItem[] = [
    {
        Id: '00000000-0000-0000-0000-000000000001',
        OrderId: '00000000-0000-0000-0000-000000000011',
        Type: OrderItemType.ShoppingCartItem,
        ProductId: '00000000-0000-0000-0000-000000000111',
        ProductCode: 'PRD001',
        ProductName: 'Product 1',
        ProductPrice: 123,
        Description: 'Product 1',
        Amount: 5,
        Price: 100,
        Total: 500
    },
    {
        Id: '00000000-0000-0000-0000-000000000002',
        OrderId: '00000000-0000-0000-0000-000000000011',
        Type: OrderItemType.DeliveryMethod,
        ProductId: '00000000-0000-0000-0000-000000000111',
        Description: 'Delivery',
        Amount: 1,
        Price: 1000,
        Total: 1000
    }
];