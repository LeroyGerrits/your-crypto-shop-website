import { CryptoWallet } from 'src/app/shared/models/crypto-wallet.model';
import { Gender } from 'src/app/shared/enums/gender.enum';

export const TestDataCryptoWallets: CryptoWallet[] = [
    {
        Id: '00000000-0000-0000-0000-000000000001',
        MerchantId: '00000000-0000-0000-0000-000000000011',
        Name: 'Test crypto wallet 1',
        Address: 'crypto123'
    },
    {
        Id: '00000000-0000-0000-0000-000000000002',
        MerchantId: '00000000-0000-0000-0000-000000000012',
        Name: 'Test crypto wallet 2',
        Address: 'crypto123'
    }
];