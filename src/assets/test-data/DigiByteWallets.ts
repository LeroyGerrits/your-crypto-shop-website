import { DigiByteWallet } from 'src/app/shared/models/DigiByteWallet.model';
import { Gender } from 'src/app/shared/enums/Gender.enum';

export const TestDataDigiByteWallets: DigiByteWallet[] = [
    {
        Id: '00000000-0000-0000-0000-000000000001',
        Merchant: {
            Id: '00000000-0000-0000-0000-000000000011',
            EmailAddress: 'merchant@dgbcommerce.com',
            Username: 'DGB Commerce',
            Gender: Gender.Male,
            LastName: 'Test',
            Salutation:'Mr. Test'
        },
        Name: 'Test DigiByte wallet 1',
        Address: 'dgb123'
    },
    {
        Id: '00000000-0000-0000-0000-000000000002',
        Merchant: {
            Id: '00000000-0000-0000-0000-000000000012',
            EmailAddress: 'merchant@dgbcommerce.com',
            Username: 'DGB Commerce',
            Gender: Gender.Male,
            LastName: 'Test',
            Salutation:'Mr. Test'
        },
        Name: 'Test DigiByte wallet 2',
        Address: 'dgb123'
    }
];