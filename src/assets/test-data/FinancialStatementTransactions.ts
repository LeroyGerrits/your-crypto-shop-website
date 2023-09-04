import { FinancialStatementTransaction } from 'src/app/shared/models/FinancialStatementTransaction.model';
import { TestDataCurrencies } from './Currencies';

export const TestDataFinancialStatementTransactions: FinancialStatementTransaction[] = [
    {
        Id: '00000000-0000-0000-0000-000000000001',
        Type: 0,
        Date: new Date(),
        Currency: TestDataCurrencies[0],
        Amount: 100,
        Recurrance: 0,
        Description: 'Test transaction 1'
    },
    {
        Id: '00000000-0000-0000-0000-000000000002',
        Type: 0,
        Date: new Date(),
        Currency: TestDataCurrencies[0],
        Amount: 250,
        Recurrance: 0,
        Description: 'Test transaction 2'
    }
];