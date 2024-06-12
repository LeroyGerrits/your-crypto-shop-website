import { HttpClient, HttpParams } from '@angular/common/http';

import { CryptoWallet } from 'src/app/shared/models/crypto-wallet.model';
import { Environment } from 'src/app/shared/environments/-environment';
import { GetCryptoWalletsParameters } from '../models/parameters/get-crypto-wallets-parameters.model';
import { Injectable } from '@angular/core';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { Observable } from 'rxjs';

@Injectable()
export class CryptoWalletService {
    private apiUrl = Environment.API_URL + '/CryptoWallet';

    constructor(protected http: HttpClient) { }

    create(cryptoWallet: CryptoWallet): Observable<MutationResult> {
        return this.http.post<MutationResult>(this.apiUrl, cryptoWallet);
    }

    getById(id: string): Observable<CryptoWallet> {
        return this.http.get<CryptoWallet>(`${this.apiUrl}/${id}`);
    }

    getList(parameters?: GetCryptoWalletsParameters): Observable<CryptoWallet[]> {
        let httpParams = new HttpParams();

        if (parameters) {
            if (parameters.Name) httpParams = httpParams.append('name', parameters.Name);
            if (parameters.Address) httpParams = httpParams.append('address', parameters.Address);
        }
        return this.http.get<CryptoWallet[]>(this.apiUrl, { params: httpParams });
    }

    delete(id: string): Observable<MutationResult> {
        return this.http.delete<MutationResult>(`${this.apiUrl}/${id}`);
    }

    update(cryptoWallet: CryptoWallet): Observable<MutationResult> {
        return this.http.put<MutationResult>(`${this.apiUrl}/${cryptoWallet.Id}`, cryptoWallet)
    }
}