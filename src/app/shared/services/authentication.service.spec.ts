import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AuthenticationService } from './authentication.service';
import { Environment } from 'src/app/shared/environments/environment';
import { TestBed } from '@angular/core/testing';

describe('AuthenticationService', () => {
    let service: AuthenticationService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    imports: [],
    providers: [AuthenticationService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
        service = TestBed.inject(AuthenticationService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be able to log in', () => {
        service.login('merchant@yourcrypto.shop', '********').subscribe();
        const request = httpMock.expectOne(Environment.API_URL + '/Merchant/Authenticate');
        expect(request.request.method).toBe('POST');
    });

    it('should be able to log out', () => {
        service.logout();
        expect(service.authenticatedMerchant).toBe(null);
    });
});