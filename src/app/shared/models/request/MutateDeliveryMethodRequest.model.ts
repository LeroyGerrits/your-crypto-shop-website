import { DeliveryMethod } from "../DeliveryMethod.model";
import { IDictionaryNumber } from "../../interfaces/idictionary-number.interface";

export class MutateDeliveryMethodRequest {
    DeliveryMethod!: DeliveryMethod;
    CostsPerCountry?: IDictionaryNumber;
}