import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { Environment } from 'src/app/shared/environments/environment';
import { GeneralService } from './general.service';
import { TestBed } from '@angular/core/testing';

describe('GeneralService', () => {
    let service: GeneralService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    imports: [],
    providers: [GeneralService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
        service = TestBed.inject(GeneralService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be able to get stats', () => {
        service.getStats().subscribe();
        const request = httpMock.expectOne(Environment.API_URL + '/General/GetStats');
        expect(request.request.method).toBe('GET');
    });
});