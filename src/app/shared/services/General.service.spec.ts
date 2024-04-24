import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Environment } from 'src/app/shared/environments/Environment';
import { GeneralService } from './General.service';
import { TestBed } from '@angular/core/testing';

describe('GeneralService', () => {
    let service: GeneralService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            imports: [HttpClientTestingModule],
            providers: [GeneralService]
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