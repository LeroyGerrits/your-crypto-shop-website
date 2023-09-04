import { Gender } from 'src/app/shared/enums/Gender.enum';
import { Shop } from 'src/app/shared/models/Shop.model';

export const TestDataShops: Shop[] = [
    {
        Id: '00000000-0000-0000-0000-000000000001',
        Name: 'Example shop 1',
        Merchant: {
            Id: '00000000-0000-0000-0000-000000000011',
            EmailAddress: 'merchant@dgbcommerce.com',
            Gender: Gender.Male,
            LastName: 'Test',
            Salutation:'Mr. Test'
        },
        SubDomain: 'exampleshop1',
        Featured: true
    },
    {
        Id: '00000000-0000-0000-0000-000000000002',
        Name: 'Example shop 2',
        Merchant: {
            Id: '00000000-0000-0000-0000-000000000012',
            EmailAddress: 'merchant@dgbcommerce.com',
            Gender: Gender.Female,
            LastName: 'Test',
            Salutation:'Ms. Test'
        },
        SubDomain: 'exampleshop2',
        Featured: false
    }
];