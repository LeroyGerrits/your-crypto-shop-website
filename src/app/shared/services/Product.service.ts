import { HttpClient, HttpParams } from '@angular/common/http';

import { Environment } from 'src/app/shared/environments/Environment';
import { GetProductResponse } from '../models/response/GetProductResponse.model';
import { GetProductsParameters } from '../models/parameters/GetProductsParameters.model';
import { Injectable } from '@angular/core';
import { MutateProductRequest } from '../models/request/MutateProductRequest.model';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/Product.model';

@Injectable()
export class ProductService {
    private apiUrl = Environment.API_URL + '/Product';

    constructor(protected http: HttpClient) { }

    getList(parameters?: GetProductsParameters): Observable<Product[]> {
        let httpParams = new HttpParams();

        if (parameters) {
            if (parameters.Name) httpParams = httpParams.append('name', parameters.Name);
            if (parameters.ShopId) httpParams = httpParams.append('shopId', parameters.ShopId);
            if (parameters.Visible != null) httpParams = httpParams.append('visible', parameters.Visible);
            if (parameters.ShowOnHome != null) httpParams = httpParams.append('showOnHome', parameters.ShowOnHome);
        }

        return this.http.get<Product[]>(this.apiUrl, { params: httpParams });
    }

    getById(id: string): Observable<GetProductResponse> {
        return this.http.get<GetProductResponse>(`${this.apiUrl}/${id}`);
    }

    create(request: MutateProductRequest): Observable<MutationResult> {
        return this.http.post<MutationResult>(this.apiUrl, request);
    }

    update(request: MutateProductRequest): Observable<MutationResult> {
        return this.http.put<MutationResult>(`${this.apiUrl}/${request.Product.Id}`, request)
    }

    delete(id: string): Observable<MutationResult> {
        return this.http.delete<MutationResult>(`${this.apiUrl}/${id}`);
    }
}