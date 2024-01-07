import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Constants } from 'src/app/shared/Constants';
import { Environment } from 'src/app/shared/environments/Environment';
import { PageCategoryService } from './PageCategory.service';
import { TestBed } from '@angular/core/testing';

describe('PageCategoryService', () => {
    let service: PageCategoryService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            imports: [HttpClientTestingModule],
            providers: [PageCategoryService]
        });
        service = TestBed.inject(PageCategoryService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be able to get a list of page categories', () => {
        service.getList().subscribe();
        const request = httpMock.expectOne(Environment.API_URL + '/PageCategory');
        expect(request.request.method).toBe('GET');
    });

    it('should be able to get a single page category', () => {
        service.getById(Constants.EMPTY_GUID).subscribe();
        const request = httpMock.expectOne(Environment.API_URL + '/PageCategory/' + Constants.EMPTY_GUID);
        expect(request.request.method).toBe('GET');
    });
});