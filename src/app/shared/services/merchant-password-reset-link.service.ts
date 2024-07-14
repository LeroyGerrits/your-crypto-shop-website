import { Environment } from 'src/app/shared/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MerchantPasswordResetLink } from '../models/merchant-password-reset-link.model';
import { MutationResult } from '../models/mutation-result.model';
import { Observable } from 'rxjs';
import { ResetPasswordRequest } from '../models/request/reset-password-request.model';

@Injectable()
export class MerchantPasswordResetLinkService {
    private apiUrl = Environment.API_URL + '/MerchantPasswordResetLink';

    constructor(protected http: HttpClient) { }

    getByIdAndKey(id: string, key: string): Observable<MerchantPasswordResetLink> {
        return this.http.get<MerchantPasswordResetLink>(`${this.apiUrl}/public?id=${id}&key=${key}`);
    }

    resetPassword(id: string, key: string, password: string): Observable<MutationResult> {
        const changePasswordRequest: ResetPasswordRequest = {
            Id: id,
            Key: key,
            Password: password
        };
        return this.http.put<MutationResult>(`${this.apiUrl}/public/reset-password`, changePasswordRequest);
    }
}