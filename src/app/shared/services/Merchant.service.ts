import { HttpClient, HttpParams } from '@angular/common/http';

import { Environment } from 'src/app/shared/environments/Environment';
import { GetCategoriesParameters } from '../models/parameters/GetCategoriesParameters.model';
import { Injectable } from '@angular/core';
import { Merchant } from 'src/app/shared/models/Merchant.model';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Observable } from 'rxjs';

@Injectable()
export class MerchantService {
    private apiUrl = Environment.API_URL + '/Merchant';

    constructor(protected http: HttpClient) { }

    create(merchant: Merchant): Observable<MutationResult> {
        return this.http.post<MutationResult>(this.apiUrl, merchant);
    }

    update(merchant: Merchant): Observable<MutationResult> {
        return this.http.put<MutationResult>(`${this.apiUrl}/${merchant.Id}`, merchant)
    }
}