import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Constants } from 'src/app/shared/Constants';
import { Environment } from 'src/app/shared/environments/Environment';
import { FinancialStatementTransactionService } from './FinancialStatementTransaction.service';
import { TestBed } from '@angular/core/testing';

describe('FinancialStatementTransactionService', () => {
    let service: FinancialStatementTransactionService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            imports: [HttpClientTestingModule],
            providers: [FinancialStatementTransactionService]
        });
        service = TestBed.inject(FinancialStatementTransactionService);
        httpMock = TestBed.inject(HttpTestingController);
    });
    
    afterEach(() => {
        httpMock.verify();
    });
    
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    
    it('should be able to get a list of financial statement transactions', () => {

        
        service.getList().subscribe();
        const request = httpMock.expectOne(Environment.API_URL + '/FinancialStatementTransaction');
        expect(request.request.method).toBe('GET');
    });

    it('should be able to get a single financial statement transaction', () => {
        service.getById(Constants.EMPTY_GUID).subscribe();
        const request = httpMock.expectOne(Environment.API_URL + '/FinancialStatementTransaction/' + Constants.EMPTY_GUID);
        expect(request.request.method).toBe('GET');
    });    
});