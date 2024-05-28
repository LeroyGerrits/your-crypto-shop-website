import { Country } from "../-country.model";
import { Customer } from "../-customer.model";

export class MutateCustomerRequest {
    Customer!: Customer;
    AddressLine1!: string;
    AddressLine2?: string;
    PostalCode!: string;
    City!: string;
    Province?: string;
    Country?: Country;
}