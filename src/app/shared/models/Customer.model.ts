import { Gender } from 'src/app/shared/enums/Gender.enum';
import { Shop } from './Shop.model';

export class Customer {
    Id!: string;
    Shop!: Shop;
    EmailAddress!: string;
    Password!: string;
    Gender!: Gender;
    FirstName?: string;
    LastName!: string;
}