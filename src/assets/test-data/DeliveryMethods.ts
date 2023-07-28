import { DeliveryMethod } from "src/app/shared/models/DeliveryMethod.model";
import { Gender } from "src/app/shared/enums/Gender";
import { Shop } from "src/app/shared/models/Shop.model";

export const TestDataDeliveryMethods: DeliveryMethod[] = [
    {
        Id: '00000000-0000-0000-0000-000000000001',
        Shop: {
            Id: '00000000-0000-0000-0000-000000000011',
            Name: 'Test shop 1',
            Merchant: {
                Id: '00000000-0000-0000-0000-000000000111',
                EmailAddress: 'merchant@dgbcommerce.com',
                Password: '*****',
                Gender: Gender.Male,
                LastName: 'Test'
            }
        },
        Name: 'Pickup'
    },
    {
        Id: '00000000-0000-0000-0000-000000000002',
        Shop: {
            Id: '00000000-0000-0000-0000-000000000012',
            Name: 'Test shop 1',
            Merchant: {
                Id: '00000000-0000-0000-0000-000000000112',
                EmailAddress: 'merchant@dgbcommerce.com',
                Password: '*****',
                Gender: Gender.Male,
                LastName: 'Test'
            }
        },
        Name: 'Package Delivery',
        Costs: 1200
    }
];