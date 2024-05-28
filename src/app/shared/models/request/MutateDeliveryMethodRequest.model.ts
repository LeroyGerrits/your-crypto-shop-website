import { DeliveryMethod } from "../delivery-method.model";
import { IDictionaryNumber } from "../../interfaces/idictionary-number.interface";

export class MutateDeliveryMethodRequest {
    DeliveryMethod!: DeliveryMethod;
    CostsPerCountry?: IDictionaryNumber;
}