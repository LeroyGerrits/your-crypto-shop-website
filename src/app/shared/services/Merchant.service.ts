import { HttpClient, HttpParams } from '@angular/common/http';

import { Environment } from 'src/app/shared/environments/Environment';
import { Injectable } from '@angular/core';
import { Merchant } from 'src/app/shared/models/Merchant.model';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Observable } from 'rxjs';
import { PublicMerchant } from '../models/viewmodels/PublicMerchant.model';

@Injectable()
export class MerchantService {
    private apiUrl = Environment.API_URL + '/Merchant';

    constructor(protected http: HttpClient) { }

    getByIdAndPassword(id: string, password: string): Observable<Merchant> {
        return this.http.get<Merchant>(`${this.apiUrl}/${id}/${password}`);
    }

    getByIdPublic(id: string): Observable<PublicMerchant> {
        return this.http.get<PublicMerchant>(`${this.apiUrl}/public/${id}`);
    }

    create(merchant: Merchant): Observable<MutationResult> {
        return this.http.post<MutationResult>(this.apiUrl, merchant);
    }

    update(merchant: Merchant): Observable<MutationResult> {
        return this.http.put<MutationResult>(`${this.apiUrl}/${merchant.Id}`, merchant)
    }

    activateAccount(merchantId: string, merchantPassword: string, newPassword: string): Observable<MutationResult> {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('merchantId', merchantId);
        httpParams = httpParams.append('merchantPassword', merchantPassword);
        httpParams = httpParams.append('newPassword', newPassword);

        return this.http.put<MutationResult>(`${this.apiUrl}/activate-account`, null, { params: httpParams })
    }
}