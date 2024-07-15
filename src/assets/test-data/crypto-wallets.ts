import { CryptoWallet } from 'src/app/shared/models/crypto-wallet.model';

export const TestDataCryptoWallets: CryptoWallet[] = [
    {
        Id: '00000000-0000-0000-0000-000000000001',
        CurrencyId: '00000000-0000-0000-0000-000000000011',
        MerchantId: '00000000-0000-0000-0000-000000000111',
        Name: 'Test crypto wallet 1',
        Address: 'crypto123'
    },
    {
        Id: '00000000-0000-0000-0000-000000000002',
        CurrencyId: '00000000-0000-0000-0000-000000000012',
        MerchantId: '00000000-0000-0000-0000-000000000112',
        Name: 'Test crypto wallet 2',
        Address: 'crypto123'
    }
];