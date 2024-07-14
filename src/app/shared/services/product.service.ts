import { HttpClient, HttpParams } from '@angular/common/http';

import { Environment } from 'src/app/shared/environments/environment';
import { GetProductResponse } from '../models/response/get-product-response.model';
import { GetProductsParameters } from '../models/parameters/get-products-parameters.model';
import { Injectable } from '@angular/core';
import { MutateProductRequest } from '../models/request/mutate-product-request.model';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';

@Injectable()
export class ProductService {
    private apiUrl = Environment.API_URL + '/Product';

    constructor(protected http: HttpClient) { }

    getList(parameters?: GetProductsParameters): Observable<Product[]> {
        let httpParams = new HttpParams();

        if (parameters) {
            if (parameters.Code) httpParams = httpParams.append('code', parameters.Code);
            if (parameters.Name) httpParams = httpParams.append('name', parameters.Name);
            if (parameters.ShopId) httpParams = httpParams.append('shopId', parameters.ShopId);
            if (parameters.CategoryId) httpParams = httpParams.append('categoryId', parameters.CategoryId);
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

    duplicate(id: string): Observable<MutationResult> {
        return this.http.put<MutationResult>(`${this.apiUrl}/${id}/Duplicate`, null)
    }

    delete(id: string): Observable<MutationResult> {
        return this.http.delete<MutationResult>(`${this.apiUrl}/${id}`);
    }
}