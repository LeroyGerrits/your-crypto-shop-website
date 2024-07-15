import { Currency } from 'src/app/shared/models/currency.model';
import { CurrencyType } from 'src/app/shared/enums/currency-type.enum';

export const TestDataCurrencies: Currency[] = [
    {
        Id: '00000000-0000-0000-0000-000000000001',
        Type: CurrencyType.Fiat,
        Symbol: '€',
        Code: 'EUR',
        Name: 'Euro',
        Supported: true
    },
    {
        Id: '00000000-0000-0000-0000-000000000002',
        Type: CurrencyType.Fiat,
        Symbol: '$',
        Code: 'USD',
        Name: 'Dollar',
        Supported: true
    }
];