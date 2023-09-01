import { Environment } from 'src/app/shared/environments/Environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MerchantPasswordResetLink } from '../models/MerchantPasswordResetLink.model';
import { Observable } from 'rxjs';

@Injectable()
export class MerchantPasswordResetLinkService {
    private apiUrl = Environment.API_URL + '/MerchantPasswordResetLink';

    constructor(protected http: HttpClient) { }

    getByIdAndKey(id: string, key: string): Observable<MerchantPasswordResetLink> {
        return this.http.get<MerchantPasswordResetLink>(`${this.apiUrl}?id=${id}&key=${key}`);
    }

    update(merchantPasswordResetLink: MerchantPasswordResetLink): Observable<MerchantPasswordResetLink> {
        return this.http.put<MerchantPasswordResetLink>(`${this.apiUrl}/${merchantPasswordResetLink.Id}`, merchantPasswordResetLink)
    }
}