import { Gender } from "src/app/shared/enums/Gender";
import { Shop } from "src/app/shared/models/Shop.model";

export const TestDataShops: Shop[] = [
    {
        Id: '00000000-0000-0000-0000-000000000001',
        Name: 'Test shop 1',
        Merchant: {
            Id: '00000000-0000-0000-0000-000000000011',
            EmailAddress: 'merchant@dgbcommerce.com',
            Password: '*****',
            Gender: Gender.Male,
            LastName: 'Test'
        }
    },
    {
        Id: '00000000-0000-0000-0000-000000000002',
        Name: 'Test shop 2',
        Merchant: {
            Id: '00000000-0000-0000-0000-000000000012',
            EmailAddress: 'merchant@dgbcommerce.com',
            Password: '*****',
            Gender: Gender.Female,
            LastName: 'Test'
        },
        SubDomain: 'exampleshop'
    }
];