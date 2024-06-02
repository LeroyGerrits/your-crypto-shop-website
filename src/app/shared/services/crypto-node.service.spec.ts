import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { CryptoNodeService } from './crypto-node.service';
import { Environment } from 'src/app/shared/environments/Environment';
import { TestBed } from '@angular/core/testing';

describe('CryptoNodeService', () => {
    let service: CryptoNodeService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            imports: [],
            providers: [CryptoNodeService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
        });
        service = TestBed.inject(CryptoNodeService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be able to get blockcount', () => {
        service.getBlockCount().subscribe();
        const request = httpMock.expectOne(Environment.API_URL + '/CryptoNode/getblockcount');
        expect(request.request.method).toBe('GET');
    });

    it('should be able to get difficulty', () => {
        service.getDifficulty().subscribe();
        const request = httpMock.expectOne(Environment.API_URL + '/CryptoNode/getdifficulty');
        expect(request.request.method).toBe('GET');
    });

    it('should be able to get IP addresses', () => {
        service.getIpAddresses().subscribe();
        const request = httpMock.expectOne(Environment.API_URL + '/CryptoNode/getipaddresses');
        expect(request.request.method).toBe('GET');
    });

    it('should be able to get mining info', () => {
        service.getMiningInfo().subscribe();
        const request = httpMock.expectOne(Environment.API_URL + '/CryptoNode/getmininginfo');
        expect(request.request.method).toBe('GET');
    });
});