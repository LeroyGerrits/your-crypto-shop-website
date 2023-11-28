import { Address } from 'src/app/shared/models/Address.model';
import { TestDataCountries } from 'dist/www-dgbcommerce-com/assets/test-data/Countries';

export const TestDataAddresses: Address[] = [
    {
        Id: '00000000-0000-0000-0000-000000000001',
        AddressLine1: 'Sesame Street 123',
        AddressLine2: 'Block ABC',
        PostalCode: '12345 AB',
        City: 'Manhattan',
        Province: 'New York',
        Country: TestDataCountries[0]
    },
    {
        Id: '00000000-0000-0000-0000-000000000002',
        AddressLine1: 'Test street',
        AddressLine2: 'Building A',
        PostalCode: '98765 ZY',
        City: 'Testville',
        Country: TestDataCountries[0]
    }
];