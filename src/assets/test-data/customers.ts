import { Customer } from 'src/app/shared/models/customer.model';
import { Gender } from 'src/app/shared/enums/gender.enum';
import { TestDataAddresses } from './addresses';
import { TestDataShops } from './shops';

export const TestDataCustomers: Customer[] = [
    {
        Id: '00000000-0000-0000-0000-000000000001',
        ShopId: TestDataShops[0].Id,
        EmailAddress: 'customer@yourcrypto.shop',
        Username: 'Your Crypto Shop',
        Gender: Gender.Male,
        FirstName: 'Test',
        LastName: 'Test',
        Salutation: 'Mr. Test',
        Address: TestDataAddresses[0]
    }, {
        Id: '00000000-0000-0000-0000-000000000002',
        ShopId: TestDataShops[0].Id,
        EmailAddress: 'customer@yourcrypto.shop',
        Username: 'Your Crypto Shop',
        Gender: Gender.Female,
        FirstName: 'Test',
        LastName: 'Test',
        Salutation: 'Ms. Test',
        Address: TestDataAddresses[0]
    }
];