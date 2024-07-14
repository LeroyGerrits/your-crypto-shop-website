import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { Constants } from 'src/app/shared/constants';
import { CryptoWalletService } from './crypto-wallet.service';
import { Environment } from 'src/app/shared/environments/environment';
import { GetCryptoWalletsParameters } from '../models/parameters/get-crypto-wallets-parameters.model';
import { TestBed } from '@angular/core/testing';
import { TestDataCryptoWallets } from 'src/assets/test-data/CryptoWallets';

describe('CryptoWalletService', () => {
    let service: CryptoWalletService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            imports: [],
            providers: [CryptoWalletService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
        });
        service = TestBed.inject(CryptoWalletService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be able to get a list of crypto wallets', () => {
        const parameters: GetCryptoWalletsParameters = {
            Name: 'Test',
            Address: 'Test'
        };

        service.getList(parameters).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/CryptoWallet?name=${parameters.Name}&address=${parameters.Address}`);
        expect(request.request.method).toBe('GET');
    });

    it('should be able to get a single crypto wallet', () => {
        service.getById(Constants.EMPTY_GUID).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/CryptoWallet/${Constants.EMPTY_GUID}`);
        expect(request.request.method).toBe('GET');
    });

    it('should be able to create a crypto wallet', () => {
        service.create(TestDataCryptoWallets[0]).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/CryptoWallet`);
        expect(request.request.method).toBe('POST');
    });

    it('should be able to update a crypto wallet', () => {
        service.update(TestDataCryptoWallets[0]).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/CryptoWallet/${TestDataCryptoWallets[0].Id}`);
        expect(request.request.method).toBe('PUT');
    });

    it('should be able to delete a crypto wallet', () => {
        service.delete(TestDataCryptoWallets[0].Id).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/CryptoWallet/${TestDataCryptoWallets[0].Id}`);
        expect(request.request.method).toBe('DELETE');
    });
});