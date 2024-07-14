import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { Constants } from 'src/app/shared/constants';
import { Environment } from 'src/app/shared/environments/environment';
import { FieldService } from './field.service';
import { GetFieldsParameters } from '../models/parameters/get-fields-parameters.model';
import { TestBed } from '@angular/core/testing';
import { TestDataFields } from 'src/assets/test-data/Fields';

describe('FieldService', () => {
    let service: FieldService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    imports: [],
    providers: [FieldService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
        service = TestBed.inject(FieldService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be able to get a list of delivery methods', () => {
        const parameters: GetFieldsParameters = {
            Name: 'Test',
            ShopId: TestDataFields[0].Shop.Id
        };

        service.getList(parameters).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Field?name=${parameters.Name}&shopId=${parameters.ShopId}`);
        expect(request.request.method).toBe('GET');
    });

    it('should be able to get a single delivery method', () => {
        service.getById(Constants.EMPTY_GUID).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Field/${Constants.EMPTY_GUID}`);
        expect(request.request.method).toBe('GET');
    });

    it('should be able to create a delivery method', () => {
        service.create(TestDataFields[0]).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Field`);
        expect(request.request.method).toBe('POST');
    });

    it('should be able to update a delivery method', () => {
        service.update(TestDataFields[0]).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Field/${TestDataFields[0].Id}`);
        expect(request.request.method).toBe('PUT');
    });

    it('should be able to delete a delivery method', () => {
        service.delete(TestDataFields[0].Id).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Field/${TestDataFields[0].Id}`);
        expect(request.request.method).toBe('DELETE');
    });
});