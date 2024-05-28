import { Address } from './-address.model';
import { Gender } from 'src/app/shared/enums/gender.enum';

export class Customer {
    Id!: string;
    ShopId!: string;
    Activated?: Date;
    EmailAddress!: string;
    Username!: string;
    Password?: string;
    Gender!: Gender;
    FirstName?: string;
    Address!: Address;
    LastName!: string;
    LastLogin?: Date;
    LastIpAddress?: string;
    SecondLastLogin?: Date;
    SecondLastIpAddress?: string;
    Salutation!: string;
    Score?: number;
}