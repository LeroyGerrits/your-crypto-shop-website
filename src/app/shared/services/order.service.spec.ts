import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { CategoryService } from './category.service';
import { Constants } from 'src/app/shared/constants';
import { Environment } from 'src/app/shared/environments/environment';
import { GetCategoriesParameters } from '../models/parameters/get-categories-parameters.model';
import { TestBed } from '@angular/core/testing';
import { TestDataCategories } from 'src/assets/test-data/categories';

describe('CategoryService', () => {
    let service: CategoryService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            imports: [],
            providers: [CategoryService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
        });
        service = TestBed.inject(CategoryService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be able to get a list of categories', () => {
        const parameters: GetCategoriesParameters = {
            ShopId: TestDataCategories[0].ShopId,
            ParentId: TestDataCategories[0].ParentId,
            Name: 'Test'
        };

        service.getList(parameters).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Category?shopId=${parameters.ShopId}&parentId=${parameters.ParentId}&name=${parameters.Name}`);
        expect(request.request.method).toBe('GET');
    });

    it('should be able to get a single category', () => {
        service.getById(Constants.EMPTY_GUID).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Category/${Constants.EMPTY_GUID}`);
        expect(request.request.method).toBe('GET');
    });

    it('should be able to create a category', () => {
        service.create(TestDataCategories[0]).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Category`);
        expect(request.request.method).toBe('POST');
    });

    it('should be able to update a category', () => {
        service.update(TestDataCategories[0]).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Category/${TestDataCategories[0].Id}`);
        expect(request.request.method).toBe('PUT');
    });

    it('should be able to change a category\'s parent', () => {
        service.changeParent(TestDataCategories[0].Id, TestDataCategories[0].ParentId!).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Category/${TestDataCategories[0].Id}/ChangeParent/${TestDataCategories[0].ParentId}`);
        expect(request.request.method).toBe('PUT');
    });

    it('should be able to move a category down', () => {
        service.moveDown(TestDataCategories[0].Id).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Category/${TestDataCategories[0].Id}/Down`);
        expect(request.request.method).toBe('PUT');
    });

    it('should be able to move a category up', () => {
        service.moveUp(TestDataCategories[0].Id).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Category/${TestDataCategories[0].Id}/Up`);
        expect(request.request.method).toBe('PUT');
    });

    it('should be able to delete a category', () => {
        service.delete(TestDataCategories[0].Id).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Category/${TestDataCategories[0].Id}`);
        expect(request.request.method).toBe('DELETE');
    });
});