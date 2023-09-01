import { Category } from 'src/app/shared/models/Category.mode.model';
import { Gender } from 'src/app/shared/enums/Gender.enum';

export const TestDataCategories: Category[] = [
    {
        Id: '00000000-0000-0000-0000-000000000011',
        Shop: {
            Id: '00000000-0000-0000-0000-000000000001',
            Name: 'Test shop 1',
            Merchant: {
                Id: '00000000-0000-0000-0000-000000000011',
                EmailAddress: 'merchant@dgbcommerce.com',
                Gender: Gender.Male,
                LastName: 'Test'
            }
        },
        Name: 'Test category 1'
    },
    {
        Id: '00000000-0000-0000-0000-000000000011',
        Shop: {
            Id: '00000000-0000-0000-0000-000000000001',
            Name: 'Test shop 1',
            Merchant: {
                Id: '00000000-0000-0000-0000-000000000011',
                EmailAddress: 'merchant@dgbcommerce.com',
                Gender: Gender.Male,
                LastName: 'Test'
            }
        },
        Name: 'Test category 2'
    }
];