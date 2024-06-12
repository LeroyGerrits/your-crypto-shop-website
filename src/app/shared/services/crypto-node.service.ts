import { Environment } from 'src/app/shared/environments/-environment';
import { GetDifficultyResponse } from '../models/parameters/get-difficulty-response.model';
import { GetMiningInfoResponse } from '../models/parameters/get-mining-info-response.model';
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

    getDifficulty(): Observable<GetDifficultyResponse> {
        return this.http.get<GetDifficultyResponse>(`${this.apiUrl}/getdifficulty`);
    }

    getIpAddresses(): Observable<string[]> {
        return this.http.get<string[]>(`${this.apiUrl}/getipaddresses`);
    }

    getMiningInfo(): Observable<GetMiningInfoResponse> {
        return this.http.get<GetMiningInfoResponse>(`${this.apiUrl}/getmininginfo`);
    }
}