import { DeliveryMethod } from "../DeliveryMethod.model";
import { IDictionaryNumber } from "../../interfaces/idictionary-number.interface";

export class GetDeliveryMethodResponse {
    DeliveryMethod!: DeliveryMethod;
    CostsPerCountry?: IDictionaryNumber;
}