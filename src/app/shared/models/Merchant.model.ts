import { Gender } from 'src/app/shared/enums/Gender';

export class Merchant {
    Id!: string;
    EmailAddress!: string;
    Password?: string;
    Gender!: Gender;
    FirstName?: string;
    LastName!: string;
    Token?: string;
}