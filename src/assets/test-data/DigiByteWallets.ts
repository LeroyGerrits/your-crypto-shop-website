import { DigiByteWallet } from 'src/app/shared/models/digibyte-wallet.model';
import { Gender } from 'src/app/shared/enums/gender.enum';

export const TestDataDigiByteWallets: DigiByteWallet[] = [
    {
        Id: '00000000-0000-0000-0000-000000000001',
        MerchantId: '00000000-0000-0000-0000-000000000011',
        Name: 'Test DigiByte wallet 1',
        Address: 'dgb123'
    },
    {
        Id: '00000000-0000-0000-0000-000000000002',
        MerchantId: '00000000-0000-0000-0000-000000000012',
        Name: 'Test DigiByte wallet 2',
        Address: 'dgb123'
    }
];