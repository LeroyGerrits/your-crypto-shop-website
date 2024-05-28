import { HttpClient, HttpParams } from '@angular/common/http';

import { DeliveryMethod } from 'src/app/shared/models/delivery-method.model';
import { Environment } from 'src/app/shared/environments/Environment';
import { GetDeliveryMethodResponse } from '../models/response/GetDeliveryMethodResponse.model';
import { GetDeliveryMethodsParameters } from '../models/parameters/GetDeliveryMethodsParameters.model';
import { Injectable } from '@angular/core';
import { MutateDeliveryMethodRequest } from '../models/request/MutateDeliveryMethodRequest.model';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { Observable } from 'rxjs';

@Injectable()
export class DeliveryMethodService {
    private apiUrl = Environment.API_URL + '/DeliveryMethod';

    constructor(protected http: HttpClient) { }

    getList(parameters?: GetDeliveryMethodsParameters): Observable<DeliveryMethod[]> {
        let httpParams = new HttpParams();

        if (parameters) {
            if (parameters.Name) httpParams = httpParams.append('name', parameters.Name);
            if (parameters.ShopId) httpParams = httpParams.append('shopId', parameters.ShopId);
        }

        return this.http.get<DeliveryMethod[]>(this.apiUrl, { params: httpParams });
    }

    getById(id: string): Observable<GetDeliveryMethodResponse> {
        return this.http.get<GetDeliveryMethodResponse>(`${this.apiUrl}/${id}`);
    }

    create(deliveryMethod: MutateDeliveryMethodRequest): Observable<MutationResult> {
        return this.http.post<MutationResult>(this.apiUrl, deliveryMethod);
    }

    update(deliveryMethod: MutateDeliveryMethodRequest): Observable<MutationResult> {
        return this.http.put<MutationResult>(`${this.apiUrl}/${deliveryMethod.DeliveryMethod.Id}`, deliveryMethod)
    }

    delete(id: string): Observable<MutationResult> {
        return this.http.delete<MutationResult>(`${this.apiUrl}/${id}`);
    }
}