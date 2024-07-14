import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { Environment } from 'src/app/shared/environments/environment';
import { GetProductPhotosParameters } from '../models/parameters/get-product-photos-parameters.model';
import { ProductPhotoService } from './product-photo.service';
import { TestBed } from '@angular/core/testing';
import { TestDataProductPhotos } from 'src/assets/test-data/ProductPhotos';

describe('ProductPhotoService', () => {
    let service: ProductPhotoService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    imports: [],
    providers: [ProductPhotoService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
        service = TestBed.inject(ProductPhotoService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be able to get a list of product photos', () => {
        const parameters: GetProductPhotosParameters = {
            ProductId: TestDataProductPhotos[0].ProductId
        };

        service.getList(parameters).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/ProductPhoto?productId=${parameters.ProductId}`);
        expect(request.request.method).toBe('GET');
    });

    it('should be able to upload a product photo', () => {
        const data = new FormData();
        service.upload(TestDataProductPhotos[0].ProductId, data).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/ProductPhoto?productId=${TestDataProductPhotos[0].ProductId}`);
        expect(request.request.method).toBe('POST');
    });

    it('should be able to change a product photo\'s description', () => {
        service.changeDescription(TestDataProductPhotos[0].Id, TestDataProductPhotos[0].Description!).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/ProductPhoto/${TestDataProductPhotos[0].Id}/ChangeDescription`);
        expect(request.request.method).toBe('PUT');
    });

    it('should be able to set a product photo as main', () => {
        service.changeMain(TestDataProductPhotos[0].Id).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/ProductPhoto/${TestDataProductPhotos[0].Id}/ChangeMain`);
        expect(request.request.method).toBe('PUT');
    });

    it('should be able to change a product photo\'s visibility', () => {
        service.changeVisible(TestDataProductPhotos[0].Id, TestDataProductPhotos[0].Visible!).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/ProductPhoto/${TestDataProductPhotos[0].Id}/ChangeVisible?visible=${TestDataProductPhotos[0].Visible}`);
        expect(request.request.method).toBe('PUT');
    });

    it('should be able to move a productPhoto down', () => {
        service.moveDown(TestDataProductPhotos[0].Id).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/ProductPhoto/${TestDataProductPhotos[0].Id}/Down`);
        expect(request.request.method).toBe('PUT');
    });

    it('should be able to move a productPhoto up', () => {
        service.moveUp(TestDataProductPhotos[0].Id).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/ProductPhoto/${TestDataProductPhotos[0].Id}/Up`);
        expect(request.request.method).toBe('PUT');
    });

    it('should be able to delete a productPhoto', () => {
        service.delete(TestDataProductPhotos[0].Id).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/ProductPhoto/${TestDataProductPhotos[0].Id}`);
        expect(request.request.method).toBe('DELETE');
    });
});