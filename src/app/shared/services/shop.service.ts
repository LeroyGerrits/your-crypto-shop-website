import { HttpClient, HttpParams } from '@angular/common/http';

import { Environment } from 'src/app/shared/environments/Environment';
import { GetShopsParameters } from '../models/parameters/GetShopsParameters.model';
import { Injectable } from '@angular/core';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Observable } from 'rxjs';
import { PublicShop } from '../models/viewmodels/PublicShop.model';
import { Shop } from 'src/app/shared/models/Shop.model';

@Injectable()
export class ShopService {
    private apiUrl = Environment.API_URL + '/Shop';

    constructor(protected http: HttpClient) { }

    getList(parameters?: GetShopsParameters): Observable<Shop[]> {
        let httpParams = new HttpParams();

        if (parameters) {
            if (parameters.Name) httpParams = httpParams.append('name', parameters.Name);
            if (parameters.SubDomain) httpParams = httpParams.append('subdomain', parameters.SubDomain);            
        }

        return this.http.get<Shop[]>(this.apiUrl, { params: httpParams });
    }

    getListPublic(parameters?: GetShopsParameters): Observable<PublicShop[]> {
        let httpParams = new HttpParams();

        if (parameters) {
            if (parameters.Name) httpParams = httpParams.append('name', parameters.Name);
            if (parameters.SubDomain) httpParams = httpParams.append('subdomain', parameters.SubDomain);            
        }

        return this.http.get<PublicShop[]>(this.apiUrl + '/public', { params: httpParams });
    }

    getListFeaturedPublic(parameters?: GetShopsParameters): Observable<PublicShop[]> {
        return this.http.get<PublicShop[]>(this.apiUrl + '/public/featured');
    }

    getById(id: string): Observable<Shop> {
        return this.http.get<Shop>(`${this.apiUrl}/${id}`);
    }

    create(shop: Shop): Observable<MutationResult> {
        return this.http.post<MutationResult>(this.apiUrl, shop);
    }

    update(shop: Shop): Observable<MutationResult> {
        return this.http.put<MutationResult>(`${this.apiUrl}/${shop.Id}`, shop)
    }

    delete(id: string): Observable<MutationResult> {
        return this.http.delete<MutationResult>(`${this.apiUrl}/${id}`);
    }
}