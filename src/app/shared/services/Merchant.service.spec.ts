import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Constants } from '../Constants';
import { Environment } from 'src/app/shared/environments/Environment';
import { MerchantService } from './Merchant.service';
import { TestBed } from '@angular/core/testing';
import { TestDataMerchants } from 'src/assets/test-data/Merchants';

describe('MerchantService', () => {
    let service: MerchantService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            imports: [HttpClientTestingModule],
            providers: [MerchantService]
        });
        service = TestBed.inject(MerchantService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be able to get a public merchant by ID', () => {
        service.getByIdPublic(Constants.EMPTY_GUID).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Merchant/public/${Constants.EMPTY_GUID}`);
        expect(request.request.method).toBe('GET');
    });

    it('should be able to get a public merchant by ID and password', () => {
        service.getByIdAndPasswordPublic(Constants.EMPTY_GUID, 'password').subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Merchant/public/${Constants.EMPTY_GUID}/password`);
        expect(request.request.method).toBe('GET');
    });

    it('should be able to create a merchant', () => {
        service.create(TestDataMerchants[0]).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Merchant`);
        expect(request.request.method).toBe('POST');
    });

    it('should be able to update a merchant', () => {
        service.update(TestDataMerchants[0]).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Merchant/${TestDataMerchants[0].Id}`);
        expect(request.request.method).toBe('PUT');
    });
});