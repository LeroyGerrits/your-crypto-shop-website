import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { Constants } from 'src/app/shared/constants';
import { CurrencyRateService } from './currency-rate.service';
import { Environment } from 'src/app/shared/environments/environment';
import { TestBed } from '@angular/core/testing';

describe('CurrencyRateService', () => {
    let service: CurrencyRateService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    imports: [],
    providers: [CurrencyRateService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
        service = TestBed.inject(CurrencyRateService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be able to get a list of currencies', () => {
        service.getList().subscribe();
        const request = httpMock.expectOne(Environment.API_URL + '/CurrencyRate');
        expect(request.request.method).toBe('GET');
    });

    it('should be able to get a single CurrencyRate', () => {
        service.getById(Constants.EMPTY_GUID).subscribe();
        const request = httpMock.expectOne(Environment.API_URL + '/CurrencyRate/' + Constants.EMPTY_GUID);
        expect(request.request.method).toBe('GET');
    });
});