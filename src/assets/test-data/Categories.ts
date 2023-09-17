import { Category } from 'src/app/shared/models/Category.model';
import { TestDataShops } from './Shops';

export const TestDataCategories: Category[] = [
    {
        Id: '00000000-0000-0000-0000-000000000001',
        ParentId: '00000000-0000-0000-0000-000000000011',
        ShopId: TestDataShops[0].Id,
        Name: 'Test category 1',
        Visible: true
    },
    {
        Id: '00000000-0000-0000-0000-000000000001',
        ShopId: TestDataShops[0].Id,
        Name: 'Test category 2',
        Visible: true
    }
];