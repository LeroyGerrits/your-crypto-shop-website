import { Transaction } from 'src/app/shared/models/-transaction.model';

export const TestDataTransactions: Transaction[] = [
    {
        Id: '00000000-0000-0000-0000-000000000001',
        ShopId: '00000000-0000-0000-0000-000000000011',
        Date: new Date(),
        Recipient: 'wallet123',
        AmountDue: 100,
        AmountPaid: 100,
        PaidInFull: new Date(),
        Tx: 'tx123'
    },
    {
        Id: '00000000-0000-0000-0000-000000000002',
        ShopId: '00000000-0000-0000-0000-000000000011',
        Date: new Date(),
        Recipient: 'wallet456',
        AmountDue: 200,
        AmountPaid: 0
    }
];