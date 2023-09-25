import { Environment } from 'src/app/shared/environments/Environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Merchant } from 'src/app/shared/models/Merchant.model';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Observable } from 'rxjs';
import { PublicMerchant } from '../models/viewmodels/PublicMerchant.model';

@Injectable()
export class MerchantService {
    private apiUrl = Environment.API_URL + '/Merchant';

    constructor(protected http: HttpClient) { }

    getByIdPublic(id: string): Observable<PublicMerchant> {
        return this.http.get<PublicMerchant>(`${this.apiUrl}/public/${id}`);
    }

    create(merchant: Merchant): Observable<MutationResult> {
        return this.http.post<MutationResult>(this.apiUrl, merchant);
    }

    update(merchant: Merchant): Observable<MutationResult> {
        return this.http.put<MutationResult>(`${this.apiUrl}/${merchant.Id}`, merchant)
    }
}