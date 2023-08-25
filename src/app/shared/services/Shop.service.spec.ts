import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Constants } from '../Constants';
import { Environment } from '../environments/Environment';
import { ShopService } from './Shop.service';
import { TestBed } from '@angular/core/testing';
import { TestDataShops } from 'src/assets/test-data/Shops';

describe('ShopService', () => {
    let service: ShopService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            imports: [HttpClientTestingModule],
            providers: [ShopService]
        });
        service = TestBed.inject(ShopService);
        httpMock = TestBed.inject(HttpTestingController);
    });
    
    afterEach(() => {
        httpMock.verify();
    });
    
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    
    it('should be able to get a list of shops', () => {
        service.getList().subscribe();
        const request = httpMock.expectOne(Environment.API_URL + '/Shop');
        expect(request.request.method).toBe('GET');
    });

    it('should be able to get a single shop', () => {
        service.getById(Constants.EMPTY_GUID).subscribe();
        const request = httpMock.expectOne(Environment.API_URL + '/Shop/' + Constants.EMPTY_GUID);
        expect(request.request.method).toBe('GET');
    });
    
    it('should be able to create a shop', () => {
        service.create(TestDataShops[0]).subscribe();
        const request = httpMock.expectOne(Environment.API_URL + '/Shop');
        expect(request.request.method).toBe('POST');
    });

    it('should be able to update a shop', () => {
        service.update(TestDataShops[0]).subscribe();
        const request = httpMock.expectOne(Environment.API_URL + '/Shop/' + TestDataShops[0].Id);
        expect(request.request.method).toBe('PUT');
    });

    it('should be able to delete a shop', () => {
        service.delete(TestDataShops[0].Id).subscribe();
        const request = httpMock.expectOne(Environment.API_URL + '/Shop/' + TestDataShops[0].Id);
        expect(request.request.method).toBe('DELETE');
    });
});