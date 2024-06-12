import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { Constants } from 'src/app/shared/constants';
import { Environment } from 'src/app/shared/environments/-environment';
import { NewsMessageService } from './news-message.service';
import { TestBed } from '@angular/core/testing';

describe('NewsMessageService', () => {
    let service: NewsMessageService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    imports: [],
    providers: [NewsMessageService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
        service = TestBed.inject(NewsMessageService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be able to get a list of News messages', () => {
        service.getList().subscribe();
        const request = httpMock.expectOne(Environment.API_URL + '/NewsMessage');
        expect(request.request.method).toBe('GET');
    });

    it('should be able to get a single news message', () => {
        service.getById(Constants.EMPTY_GUID).subscribe();
        const request = httpMock.expectOne(Environment.API_URL + '/NewsMessage/' + Constants.EMPTY_GUID);
        expect(request.request.method).toBe('GET');
    });
});