import { BehaviorSubject, Observable } from 'rxjs';

import { Environment } from "src/app/shared/environments/Environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Merchant } from "src/app/shared/models/Merchant.model";
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private merchantSubject: BehaviorSubject<Merchant | null>;
    public merchant: Observable<Merchant | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.merchantSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('merchant')!));
        this.merchant = this.merchantSubject.asObservable();
    }

    public get merchantValue() {
        return this.merchantSubject.value;
    }

    login(emailAddress: string, password: string) {
        return this.http.post<any>(`${Environment.API_URL}/Merchant/authenticate`, { emailAddress, password })
            .pipe(map(merchant => {
                localStorage.setItem('merchant', JSON.stringify(merchant));
                this.merchantSubject.next(merchant);
                return merchant;
            }));
    }

    logout() {
        localStorage.removeItem('merchant');
        this.merchantSubject.next(null);
        this.router.navigate(['/account/login']);
    }
}