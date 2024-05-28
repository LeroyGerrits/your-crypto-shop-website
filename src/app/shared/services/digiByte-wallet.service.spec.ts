import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { Constants } from 'src/app/shared/-constants';
import { DigiByteWalletService } from './digibyte-wallet.service';
import { Environment } from 'src/app/shared/environments/Environment';
import { GetDigiByteWalletsParameters } from '../models/parameters/GetDigiByteWalletsParameters.model';
import { TestBed } from '@angular/core/testing';
import { TestDataDigiByteWallets } from 'src/assets/test-data/DigiByteWallets';

describe('DigiByteWalletService', () => {
    let service: DigiByteWalletService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    imports: [],
    providers: [DigiByteWalletService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
        service = TestBed.inject(DigiByteWalletService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be able to get a list of digibyte wallets', () => {
        const parameters: GetDigiByteWalletsParameters = {
            Name: 'Test',
            Address: 'Test'
        };

        service.getList(parameters).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/DigiByteWallet?name=${parameters.Name}&address=${parameters.Address}`);
        expect(request.request.method).toBe('GET');
    });

    it('should be able to get a single digibyte wallet', () => {
        service.getById(Constants.EMPTY_GUID).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/DigiByteWallet/${Constants.EMPTY_GUID}`);
        expect(request.request.method).toBe('GET');
    });

    it('should be able to create a digibyte wallet', () => {
        service.create(TestDataDigiByteWallets[0]).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/DigiByteWallet`);
        expect(request.request.method).toBe('POST');
    });

    it('should be able to update a digibyte wallet', () => {
        service.update(TestDataDigiByteWallets[0]).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/DigiByteWallet/${TestDataDigiByteWallets[0].Id}`);
        expect(request.request.method).toBe('PUT');
    });

    it('should be able to delete a digibyte wallet', () => {
        service.delete(TestDataDigiByteWallets[0].Id).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/DigiByteWallet/${TestDataDigiByteWallets[0].Id}`);
        expect(request.request.method).toBe('DELETE');
    });
});