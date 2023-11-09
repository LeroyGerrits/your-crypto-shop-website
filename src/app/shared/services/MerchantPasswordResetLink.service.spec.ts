import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Constants } from 'src/app/shared/Constants';
import { Environment } from 'src/app/shared/environments/Environment';
import { MerchantPasswordResetLinkService } from './MerchantPasswordResetLink.service';
import { TestBed } from '@angular/core/testing';
import { TestDataMerchantPasswordResetLinks } from 'src/assets/test-data/MerchantPasswordResetLinks';

describe('MerchantPasswordResetLinkService', () => {
    let service: MerchantPasswordResetLinkService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            imports: [HttpClientTestingModule],
            providers: [MerchantPasswordResetLinkService]
        });
        service = TestBed.inject(MerchantPasswordResetLinkService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be able to get a single merchant password reset link', () => {
        service.getByIdAndKey(Constants.EMPTY_GUID, 'test').subscribe();
        const request = httpMock.expectOne(Environment.API_URL + '/MerchantPasswordResetLink?id=' + Constants.EMPTY_GUID + '&key=test');
        expect(request.request.method).toBe('GET');
    });

    it('should be able to update a merchant password reset link', () => {
        service.update(TestDataMerchantPasswordResetLinks[0]).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/MerchantPasswordResetLink/${TestDataMerchantPasswordResetLinks[0].Id}`);
        expect(request.request.method).toBe('PUT');
    });
});