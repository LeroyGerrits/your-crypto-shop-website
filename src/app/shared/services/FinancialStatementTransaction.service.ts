import { Environment } from 'src/app/shared/environments/Environment';
import { FinancialStatementTransaction } from '../models/FinancialStatementTransaction.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class FinancialStatementTransactionService {
    private apiUrl = Environment.API_URL + '/FinancialStatementTransaction';

    constructor(protected http: HttpClient) { }

    getList(): Observable<FinancialStatementTransaction[]> {
        return this.http.get<FinancialStatementTransaction[]>(this.apiUrl);
    }

    getById(id: string): Observable<FinancialStatementTransaction> {
        return this.http.get<FinancialStatementTransaction>(`${this.apiUrl}/${id}`);
    }
}