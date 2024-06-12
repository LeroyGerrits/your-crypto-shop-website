import { DeliveryMethod } from "../delivery-method.model";
import { IDictionaryNumber } from "../../interfaces/idictionary-number.interface";

export class GetDeliveryMethodResponse {
    DeliveryMethod!: DeliveryMethod;
    CostsPerCountry?: IDictionaryNumber;
}