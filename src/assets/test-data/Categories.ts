import { Category } from 'src/app/shared/models/Category.mode.model';
import { Gender } from 'src/app/shared/enums/Gender.enum';
import { TestDataShops } from './Shops';

export const TestDataCategories: Category[] = [
    {
        Id: '00000000-0000-0000-0000-000000000001',
        Parent: {
            Id: '00000000-0000-0000-0000-000000000011',
            Shop: TestDataShops[0],
            Name: 'Parent category 1'
        },
        Shop: TestDataShops[0],
        Name: 'Test category 1'
    },
    {
        Id: '00000000-0000-0000-0000-000000000001',
        Shop: TestDataShops[0],
        Name: 'Test category 2'
    }
];