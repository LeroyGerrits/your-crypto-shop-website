import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { Constants } from 'src/app/shared/constants';
import { DeliveryMethod } from '../models/delivery-method.model';
import { DeliveryMethodService } from './delivery-method.service';
import { Environment } from 'src/app/shared/environments/environment';
import { GetDeliveryMethodsParameters } from '../models/parameters/get-delivery-methods-parameters.model';
import { MutateDeliveryMethodRequest } from '../models/request/mutate-delivery-method-request.model';
import { TestBed } from '@angular/core/testing';
import { TestDataDeliveryMethods } from 'src/assets/test-data/DeliveryMethods';

describe('DeliveryMethodService', () => {
    let service: DeliveryMethodService;
    let httpMock: HttpTestingController;

    const mutateDeliveryMethodRequest: MutateDeliveryMethodRequest = {
        DeliveryMethod: TestDataDeliveryMethods[0],
        CostsPerCountry: {}
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            imports: [],
            providers: [DeliveryMethodService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
        });
        service = TestBed.inject(DeliveryMethodService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be able to get a list of delivery methods', () => {
        const parameters: GetDeliveryMethodsParameters = {
            Name: 'Test',
            ShopId: TestDataDeliveryMethods[0].Shop.Id
        };

        service.getList(parameters).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/DeliveryMethod?name=${parameters.Name}&shopId=${parameters.ShopId}`);
        expect(request.request.method).toBe('GET');
    });

    it('should be able to get a single delivery method', () => {
        service.getById(Constants.EMPTY_GUID).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/DeliveryMethod/${Constants.EMPTY_GUID}`);
        expect(request.request.method).toBe('GET');
    });

    it('should be able to create a delivery method', () => {
        service.create(mutateDeliveryMethodRequest).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/DeliveryMethod`);
        expect(request.request.method).toBe('POST');
    });

    it('should be able to update a delivery method', () => {
        service.update(mutateDeliveryMethodRequest).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/DeliveryMethod/${TestDataDeliveryMethods[0].Id}`);
        expect(request.request.method).toBe('PUT');
    });

    it('should be able to delete a delivery method', () => {
        service.delete(TestDataDeliveryMethods[0].Id).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/DeliveryMethod/${TestDataDeliveryMethods[0].Id}`);
        expect(request.request.method).toBe('DELETE');
    });
});