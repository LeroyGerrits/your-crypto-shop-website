import { Environment } from 'src/app/shared/environments/-environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CryptoNodeService {
    private apiUrl = Environment.API_URL + '/CryptoNode';

    constructor(protected http: HttpClient) { }

    getBlockCount(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/getblockcount`);
    }

    getIpAddresses(): Observable<string[]> {
        return this.http.get<string[]>(`${this.apiUrl}/getipaddresses`);
    }
}