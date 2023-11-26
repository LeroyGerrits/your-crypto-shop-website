import { Customer } from 'src/app/shared/models/Customer.model';
import { Gender } from 'src/app/shared/enums/Gender.enum';
import { TestDataShops } from './Shops';

export const TestDataCustomers: Customer[] = [
    {
        Id: '00000000-0000-0000-0000-000000000001',
        Shop: TestDataShops[0],
        EmailAddress: 'customer@dgbcommerce.com',
        Username: 'DGB Commerce',
        Gender: Gender.Male,
        LastName: 'Test',
        Salutation: 'Mr. Test'
    }, {
        Id: '00000000-0000-0000-0000-000000000002',
        Shop: TestDataShops[0],
        EmailAddress: 'customer@dgbcommerce.com',
        Username: 'DGB Commerce',
        Gender: Gender.Female,
        LastName: 'Test',
        Salutation: 'Ms. Test'
    }
];