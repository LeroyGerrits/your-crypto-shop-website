import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Environment } from 'src/app/shared/environments/Environment';
import { StatsService } from './Stats.service';
import { TestBed } from '@angular/core/testing';

describe('StatsService', () => {
    let service: StatsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            imports: [HttpClientTestingModule],
            providers: [StatsService]
        });
        service = TestBed.inject(StatsService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be able to get stats', () => {
        service.get().subscribe();
        const request = httpMock.expectOne(Environment.API_URL + '/Stats');
        expect(request.request.method).toBe('GET');
    });
});