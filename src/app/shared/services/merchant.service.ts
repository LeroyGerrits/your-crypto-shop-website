import { ActivateAccountRequest } from '../models/request/activate-account-request.model';
import { ChangePasswordRequest } from '../models/request/change-password-request.model';
import { Environment } from 'src/app/shared/environments/-environment';
import { ForgotPasswordRequest } from '../models/request/forgot-password-request.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Merchant } from 'src/app/shared/models/merchant.model';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { Observable } from 'rxjs';
import { PublicMerchant } from '../models/viewmodels/public-merchant.model';

@Injectable()
export class MerchantService {
    private apiUrl = Environment.API_URL + '/Merchant';

    constructor(protected http: HttpClient) { }

    activateAccount(id: string, currentPassword: string, newPassword: string): Observable<MutationResult> {
        const activateAccountRequest: ActivateAccountRequest = {
            Id: id,
            CurrentPassword: currentPassword,
            NewPassword: newPassword
        };
        return this.http.put<MutationResult>(`${this.apiUrl}/activate-account`, activateAccountRequest);
    }

    changePassword(currentPassword: string, newPassword: string): Observable<MutationResult> {
        const changePasswordRequest: ChangePasswordRequest = {
            CurrentPassword: currentPassword,
            NewPassword: newPassword
        };
        return this.http.put<MutationResult>(`${this.apiUrl}/change-password`, changePasswordRequest);
    }

    forgotPassword(emailAddress: string): Observable<any> {
        const forgotPasswordRequest: ForgotPasswordRequest = {
            EmailAddress: emailAddress
        };
        return this.http.post(`${this.apiUrl}/public/forgot-password`, forgotPasswordRequest);
    }

    create(merchant: Merchant): Observable<MutationResult> {
        return this.http.post<MutationResult>(this.apiUrl, merchant);
    }

    getByIdAndPassword(id: string, password: string): Observable<Merchant> {
        return this.http.get<Merchant>(`${this.apiUrl}/${id}/${password}`);
    }

    getByIdPublic(id: string): Observable<PublicMerchant> {
        return this.http.get<PublicMerchant>(`${this.apiUrl}/public/${id}`);
    }

    update(merchant: Merchant): Observable<MutationResult> {
        return this.http.put<MutationResult>(`${this.apiUrl}/${merchant.Id}`, merchant)
    }
}