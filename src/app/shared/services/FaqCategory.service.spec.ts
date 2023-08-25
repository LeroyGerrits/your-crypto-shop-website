import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Constants } from 'src/app/shared/Constants';
import { Environment } from 'src/app/shared/environments/Environment';
import { FaqCategoryService } from './FaqCategory.service';
import { TestBed } from '@angular/core/testing';

describe('FaqCategoryService', () => {
    let service: FaqCategoryService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            imports: [HttpClientTestingModule],
            providers: [FaqCategoryService]
        });
        service = TestBed.inject(FaqCategoryService);
        httpMock = TestBed.inject(HttpTestingController);
    });
    
    afterEach(() => {
        httpMock.verify();
    });
    
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    
    it('should be able to get a list of FAQ categories', () => {
        service.getList().subscribe();
        const request = httpMock.expectOne(Environment.API_URL + '/FaqCategory');
        expect(request.request.method).toBe('GET');
    });

    it('should be able to get a single FAQ category', () => {
        service.getById(Constants.EMPTY_GUID).subscribe();
        const request = httpMock.expectOne(Environment.API_URL + '/FaqCategory/' + Constants.EMPTY_GUID);
        expect(request.request.method).toBe('GET');
    });    
});