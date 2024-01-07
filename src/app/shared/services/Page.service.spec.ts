import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Constants } from 'src/app/shared/Constants';
import { Environment } from 'src/app/shared/environments/Environment';
import { GetPagesParameters } from '../models/parameters/GetPagesParameters.model';
import { MutatePageRequest } from '../models/request/MutatePageRequest.model';
import { PageService } from './Page.service';
import { TestBed } from '@angular/core/testing';
import { TestDataPages } from 'src/assets/test-data/Pages';

describe('PageService', () => {
    let service: PageService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            imports: [HttpClientTestingModule],
            providers: [PageService]
        });
        service = TestBed.inject(PageService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be able to get a list of products', () => {
        const parameters: GetPagesParameters = {
            Title: 'Test',
            ShopId: TestDataPages[0].Shop.Id,
            Visible: true
        };

        service.getList(parameters).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Page?title=${parameters.Title}&shopId=${parameters.ShopId}&visible=${parameters.Visible}`);
        expect(request.request.method).toBe('GET');
    });

    it('should be able to get a single product', () => {
        service.getById(Constants.EMPTY_GUID).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Page/${Constants.EMPTY_GUID}`);
        expect(request.request.method).toBe('GET');
    });

    it('should be able to create a product', () => {
        const mutatePageRequest: MutatePageRequest = {
            Page: TestDataPages[0],
            CheckedCategories: ''
        };
        service.create(mutatePageRequest).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Page`);
        expect(request.request.method).toBe('POST');
    });

    it('should be able to update a product', () => {
        const mutatePageRequest: MutatePageRequest = {
            Page: TestDataPages[0],
            CheckedCategories: ''
        };
        service.update(mutatePageRequest).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Page/${TestDataPages[0].Id}`);
        expect(request.request.method).toBe('PUT');
    });

    it('should be able to delete a product', () => {
        service.delete(TestDataPages[0].Id).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Page/${TestDataPages[0].Id}`);
        expect(request.request.method).toBe('DELETE');
    });
});