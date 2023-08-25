import { DeliveryMethod } from 'src/app/shared/models/DeliveryMethod.model';
import { Gender } from 'src/app/shared/enums/Gender';

export const TestDataDeliveryMethods: DeliveryMethod[] = [
    {
        Id: '00000000-0000-0000-0000-000000000001',
        Shop: {
            Id: '00000000-0000-0000-0000-000000000001',
            Name: 'Example shop 1',
            Merchant: {
                Id: '00000000-0000-0000-0000-000000000011',
                EmailAddress: 'merchant@dgbcommerce.com',
                Gender: Gender.Male,
                LastName: 'Test'
            },
            SubDomain: 'exampleshop1'
        },
        Name: 'Pickup',
        Costs: 100
    },
    {
        Id: '00000000-0000-0000-0000-000000000002',
        Shop: {
            Id: '00000000-0000-0000-0000-000000000002',
            Name: 'Example shop 2',
            Merchant: {
                Id: '00000000-0000-0000-0000-000000000012',
                EmailAddress: 'merchant@dgbcommerce.com',
                Gender: Gender.Female,
                LastName: 'Test'
            },
            SubDomain: 'exampleshop2'
        },
        Name: 'Package Delivery',
        Costs: 1200
    }
];