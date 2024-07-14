import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { Constants } from 'src/app/shared/constants';
import { Environment } from 'src/app/shared/environments/environment';
import { GetProductsParameters } from '../models/parameters/get-products-parameters.model';
import { MutateProductRequest } from '../models/request/mutate-product-request.model';
import { ProductService } from './product.service';
import { TestBed } from '@angular/core/testing';
import { TestDataCategories } from 'src/assets/test-data/Categories';
import { TestDataProducts } from 'src/assets/test-data/-products';

describe('ProductService', () => {
    let service: ProductService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    imports: [],
    providers: [ProductService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
        service = TestBed.inject(ProductService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be able to get a list of products', () => {
        const parameters: GetProductsParameters = {
            Name: 'Test',
            ShopId: TestDataProducts[0].ShopId,
            CategoryId: TestDataCategories[0].Id,
            Visible: true,
            ShowOnHome: true
        };

        service.getList(parameters).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Product?name=${parameters.Name}&shopId=${parameters.ShopId}&categoryId=${parameters.CategoryId}&visible=${parameters.Visible}&showOnHome=${parameters.ShowOnHome}`);
        expect(request.request.method).toBe('GET');
    });

    it('should be able to get a single product', () => {
        service.getById(Constants.EMPTY_GUID).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Product/${Constants.EMPTY_GUID}`);
        expect(request.request.method).toBe('GET');
    });

    it('should be able to create a product', () => {
        const mutateProductRequest: MutateProductRequest = {
            Product: TestDataProducts[0],
            CheckedCategories: ''
        };
        service.create(mutateProductRequest).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Product`);
        expect(request.request.method).toBe('POST');
    });

    it('should be able to update a product', () => {
        const mutateProductRequest: MutateProductRequest = {
            Product: TestDataProducts[0],
            CheckedCategories: ''
        };
        service.update(mutateProductRequest).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Product/${TestDataProducts[0].Id}`);
        expect(request.request.method).toBe('PUT');
    });

    it('should be able to delete a product', () => {
        service.delete(TestDataProducts[0].Id).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Product/${TestDataProducts[0].Id}`);
        expect(request.request.method).toBe('DELETE');
    });
});