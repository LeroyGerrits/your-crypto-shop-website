import { DeliveryMethod } from "../models/DeliveryMethod.model";
import { Environment } from "src/app/shared/environments/Environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MutationResult } from "../models/MutationResult";
import { Observable } from "rxjs";

@Injectable()
export class DeliveryMethodService {
    private apiUrl = Environment.API_URL + '/DeliveryMethod';

    constructor(protected http: HttpClient) { }

    getList(): Observable<DeliveryMethod[]> {
        return this.http.get<DeliveryMethod[]>(this.apiUrl);
    }

    getById(id: string): Observable<DeliveryMethod> {
        return this.http.get<DeliveryMethod>(`${this.apiUrl}/${id}`);
    }

    create(deliveryMethod: DeliveryMethod): Observable<MutationResult> {
        return this.http.post<MutationResult>(this.apiUrl, deliveryMethod);
    }

    update(deliveryMethod: DeliveryMethod): Observable<MutationResult> {
        return this.http.put<MutationResult>(`${this.apiUrl}/${deliveryMethod.Id}`, deliveryMethod)
    }

    delete(id: string): Observable<MutationResult> {
        return this.http.delete<MutationResult>(`${this.apiUrl}/${id}`);
    }
}