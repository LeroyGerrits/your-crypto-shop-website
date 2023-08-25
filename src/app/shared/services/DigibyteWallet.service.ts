import { DigiByteWallet } from 'src/app/shared/models/DigiByteWallet.model';
import { Environment } from 'src/app/shared/environments/Environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Observable } from 'rxjs';

@Injectable()
export class DigiByteWalletService {
    private apiUrl = Environment.API_URL + '/DigiByteWallet';

    constructor(protected http: HttpClient) { }

    getList(): Observable<DigiByteWallet[]> {
        return this.http.get<DigiByteWallet[]>(this.apiUrl);
    }

    getById(id: string): Observable<DigiByteWallet> {
        return this.http.get<DigiByteWallet>(`${this.apiUrl}/${id}`);
    }

    create(digiByteWallet: DigiByteWallet): Observable<MutationResult> {
        return this.http.post<MutationResult>(this.apiUrl, digiByteWallet);
    }

    update(digiByteWallet: DigiByteWallet): Observable<MutationResult> {
        return this.http.put<MutationResult>(`${this.apiUrl}/${digiByteWallet.Id}`, digiByteWallet)
    }

    delete(id: string): Observable<MutationResult> {
        return this.http.delete<MutationResult>(`${this.apiUrl}/${id}`);
    }
}