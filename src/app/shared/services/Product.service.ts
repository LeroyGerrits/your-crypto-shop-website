import { HttpClient, HttpParams } from '@angular/common/http';

import { Environment } from 'src/app/shared/environments/Environment';
import { GetProductsParameters } from '../models/parameters/GetProductsParameters.model';
import { Injectable } from '@angular/core';
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
        }

        return this.http.get<Product[]>(this.apiUrl);
    }

    getById(id: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/${id}`);
    }

    create(product: Product): Observable<MutationResult> {
        return this.http.post<MutationResult>(this.apiUrl, product);
    }

    update(product: Product): Observable<MutationResult> {
        return this.http.put<MutationResult>(`${this.apiUrl}/${product.Id}`, product)
    }

    delete(id: string): Observable<MutationResult> {
        return this.http.delete<MutationResult>(`${this.apiUrl}/${id}`);
    }
}