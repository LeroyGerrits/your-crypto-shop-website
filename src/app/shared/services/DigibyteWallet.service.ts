import { HttpClient, HttpParams } from '@angular/common/http';

import { DigiByteWallet } from 'src/app/shared/models/DigiByteWallet.model';
import { Environment } from 'src/app/shared/environments/Environment';
import { GetDigiByteWalletsParameters } from '../models/parameters/GetDigiByteWalletsParameters.model';
import { Injectable } from '@angular/core';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Observable } from 'rxjs';

@Injectable()
export class DigiByteWalletService {
    private apiUrl = Environment.API_URL + '/DigiByteWallet';

    constructor(protected http: HttpClient) { }

    create(digiByteWallet: DigiByteWallet): Observable<MutationResult> {
        return this.http.post<MutationResult>(this.apiUrl, digiByteWallet);
    }

    getById(id: string): Observable<DigiByteWallet> {
        return this.http.get<DigiByteWallet>(`${this.apiUrl}/${id}`);
    }

    getList(parameters?: GetDigiByteWalletsParameters): Observable<DigiByteWallet[]> {
        let httpParams = new HttpParams();

        if (parameters) {
            if (parameters.Name) httpParams = httpParams.append('name', parameters.Name);
            if (parameters.Address) httpParams = httpParams.append('address', parameters.Address);
        }
        return this.http.get<DigiByteWallet[]>(this.apiUrl, { params: httpParams });
    }

    delete(id: string): Observable<MutationResult> {
        return this.http.delete<MutationResult>(`${this.apiUrl}/${id}`);
    }

    update(digiByteWallet: DigiByteWallet): Observable<MutationResult> {
        return this.http.put<MutationResult>(`${this.apiUrl}/${digiByteWallet.Id}`, digiByteWallet)
    }
}