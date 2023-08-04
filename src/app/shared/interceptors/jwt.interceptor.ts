import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { AuthenticationService } from '../services/Authentication.service';
import { Environment } from '../environments/Environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const merchant = this.authenticationService.merchantValue;
        const isLoggedIn = merchant?.Token;
        const isApiUrl = request.url.startsWith(Environment.API_URL);
        
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${merchant.Token}`
                }
            });
        }

        return next.handle(request);
    }
}