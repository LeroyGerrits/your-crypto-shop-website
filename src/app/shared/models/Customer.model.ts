import { Gender } from "../enums/Gender";
import { Shop } from "./Shop.model";

export class Customer {
    Id!: string;
    Shop!: Shop;
    EmailAddress!: string;
    Password!: string;
    Gender!: Gender;
    FirstName?: string;
    LastName!: string;
}