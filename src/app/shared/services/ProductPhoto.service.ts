import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';

import { Environment } from 'src/app/shared/environments/Environment';
import { GetProductPhotosParameters } from '../models/parameters/GetProductPhotosParameters.model';
import { Injectable } from '@angular/core';
import { MutateProductRequest } from '../models/request/MutateProductRequest.model';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Observable } from 'rxjs';
import { ProductPhoto } from '../models/ProductPhoto.model';

@Injectable()
export class ProductPhotoService {
    private apiUrl = Environment.API_URL + '/ProductPhoto';

    constructor(protected http: HttpClient) { }

    getList(parameters?: GetProductPhotosParameters): Observable<ProductPhoto[]> {
        let httpParams = new HttpParams();

        if (parameters) {
            if (parameters.ProductId) httpParams = httpParams.append('productId', parameters.ProductId);
        }

        return this.http.get<ProductPhoto[]>(this.apiUrl, { params: httpParams });
    }

    upload(productId: string, formData: FormData): Observable<HttpEvent<MutationResult>> {
        return this.http.post<MutationResult>(`${this.apiUrl}?productId=${productId}`, formData, { reportProgress: true, observe: 'events' });
    }

    update(request: MutateProductRequest): Observable<MutationResult> {
        return this.http.put<MutationResult>(`${this.apiUrl}/${request.Product.Id}`, request)
    }

    delete(id: string): Observable<MutationResult> {
        return this.http.delete<MutationResult>(`${this.apiUrl}/${id}`);
    }
}