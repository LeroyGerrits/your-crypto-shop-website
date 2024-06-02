import { Gender } from 'src/app/shared/enums/gender.enum';
import { Merchant } from 'src/app/shared/models/-merchant.model';

export const TestDataMerchants: Merchant[] = [
    {
        Id: '00000000-0000-0000-0000-000000000001',
        EmailAddress: 'merchant@yourcrypto.shop',
        Username: 'Your Crypto Shop',
        Gender: Gender.Male,
        LastName: 'Test',
        Salutation: 'Mr. Test'
    }, {
        Id: '00000000-0000-0000-0000-000000000002',
        EmailAddress: 'merchant@yourcrypto.shop',
        Username: 'Your Crypto Shop',
        Gender: Gender.Female,
        LastName: 'Test',
        Salutation: 'Ms. Test'
    }
];