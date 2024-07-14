import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { Constants } from 'src/app/shared/constants';
import { Environment } from 'src/app/shared/environments/environment';
import { MerchantPasswordResetLinkService } from './merchant-password-reset-link.service';
import { TestBed } from '@angular/core/testing';
import { TestDataMerchantPasswordResetLinks } from 'src/assets/test-data/MerchantPasswordResetLinks';

describe('MerchantPasswordResetLinkService', () => {
    let service: MerchantPasswordResetLinkService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    imports: [],
    providers: [MerchantPasswordResetLinkService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
        service = TestBed.inject(MerchantPasswordResetLinkService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be able to get a single merchant password reset link', () => {
        service.getByIdAndKey(Constants.EMPTY_GUID, 'test').subscribe();
        const request = httpMock.expectOne(Environment.API_URL + '/MerchantPasswordResetLink/public?id=' + Constants.EMPTY_GUID + '&key=test');
        expect(request.request.method).toBe('GET');
    });

    it('should be able to reset a password using a merchant password reset link', () => {
        service.resetPassword(TestDataMerchantPasswordResetLinks[0].Id, TestDataMerchantPasswordResetLinks[0].Key, 'PASSWORD').subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/MerchantPasswordResetLink/public/reset-password`);
        expect(request.request.method).toBe('PUT');
    });
});