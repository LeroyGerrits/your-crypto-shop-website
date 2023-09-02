import { Gender } from 'src/app/shared/enums/Gender.enum';

export class Merchant {
    Id!: string;
    EmailAddress!: string;
    Password?: string;
    Gender!: Gender;
    FirstName?: string;
    LastName!: string;
    LastLogin?: Date;
    LastIpAddress?: string;
    SecondLastLogin?: Date;
    SecondLastIpAddress?: string;
}