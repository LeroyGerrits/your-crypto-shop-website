import { Gender } from 'src/app/shared/enums/Gender.enum';
import { Shop } from 'src/app/shared/models/Shop.model';

export const TestDataShops: Shop[] = [
    {
        Id: '00000000-0000-0000-0000-000000000001',
        Name: 'Example shop 1',
        MerchantId: '00000000-0000-0000-0000-000000000011',
        SubDomain: 'exampleshop1',
        Featured: true
    },
    {
        Id: '00000000-0000-0000-0000-000000000002',
        Name: 'Example shop 2',
        MerchantId: '00000000-0000-0000-0000-000000000012',
        SubDomain: 'exampleshop2',
        Featured: false
    }
];