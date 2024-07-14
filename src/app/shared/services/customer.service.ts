import { HttpClient, HttpParams } from '@angular/common/http';

import { ActivateAccountRequest } from '../models/request/activate-account-request.model';
import { ChangePasswordRequest } from '../models/request/change-password-request.model';
import { Customer } from 'src/app/shared/models/customer.model';
import { Environment } from 'src/app/shared/environments/environment';
import { ForgotPasswordRequest } from '../models/request/forgot-password-request.model';
import { GetCustomersParameters } from '../models/parameters/get-customers-parameters.model';
import { Injectable } from '@angular/core';
import { MutateCustomerRequest } from '../models/request/mutate-customer-request.model';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { Observable } from 'rxjs';
import { PublicCustomer } from '../models/viewmodels/public-customer.model';

@Injectable()
export class CustomerService {
    private apiUrl = Environment.API_URL + '/Customer';

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

    create(request: MutateCustomerRequest): Observable<MutationResult> {
        return this.http.post<MutationResult>(this.apiUrl, request);
    }

    delete(id: string): Observable<MutationResult> {
        return this.http.delete<MutationResult>(`${this.apiUrl}/${id}`);
    }

    forgotPassword(emailAddress: string): Observable<any> {
        const forgotPasswordRequest: ForgotPasswordRequest = {
            EmailAddress: emailAddress
        };
        return this.http.post(`${this.apiUrl}/public/forgot-password`, forgotPasswordRequest);
    }

    getById(id: string): Observable<Customer> {
        return this.http.get<Customer>(`${this.apiUrl}/${id}`);
    }

    getByIdAndPassword(id: string, password: string): Observable<Customer> {
        return this.http.get<Customer>(`${this.apiUrl}/${id}/${password}`);
    }

    getByIdPublic(id: string): Observable<PublicCustomer> {
        return this.http.get<PublicCustomer>(`${this.apiUrl}/public/${id}`);
    }

    getList(parameters?: GetCustomersParameters): Observable<Customer[]> {
        let httpParams = new HttpParams();

        if (parameters) {
            if (parameters.ShopId) httpParams = httpParams.append('shopId', parameters.ShopId);
            if (parameters.Username) httpParams = httpParams.append('username', parameters.Username);
            if (parameters.EmailAddress) httpParams = httpParams.append('emailAddress', parameters.EmailAddress);
            if (parameters.FirstName) httpParams = httpParams.append('firstName', parameters.FirstName);
            if (parameters.LastName) httpParams = httpParams.append('lastName', parameters.LastName);
        }

        return this.http.get<Customer[]>(this.apiUrl, { params: httpParams });
    }

    update(request: MutateCustomerRequest): Observable<MutationResult> {
        return this.http.put<MutationResult>(`${this.apiUrl}/${request.Customer.Id}`, request)
    }
}