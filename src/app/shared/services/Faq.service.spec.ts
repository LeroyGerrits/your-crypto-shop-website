import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Constants } from '../Constants';
import { Environment } from '../environments/Environment';
import { FaqService } from './Faq.service';
import { TestBed } from '@angular/core/testing';
import { TestDataFaqs } from 'src/assets/test-data/Faqs';

describe('FaqService', () => {
    let service: FaqService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            imports: [HttpClientTestingModule],
            providers: [FaqService]
        });
        service = TestBed.inject(FaqService);
        httpMock = TestBed.inject(HttpTestingController);
    });
    
    afterEach(() => {
        httpMock.verify();
    });
    
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    
    it('should be able to get a list of FAQs', () => {
        service.getList().subscribe();
        const request = httpMock.expectOne(Environment.API_URL + '/Faq');
        expect(request.request.method).toBe('GET');
    });

    it('should be able to get a single FAQ', () => {
        service.getById(Constants.EMPTY_GUID).subscribe();
        const request = httpMock.expectOne(Environment.API_URL + '/Faq/' + Constants.EMPTY_GUID);
        expect(request.request.method).toBe('GET');
    });    
});