import { HttpClient, HttpParams } from '@angular/common/http';

import { DatePipe } from '@angular/common';
import { Environment } from 'src/app/shared/environments/Environment';
import { FinancialStatementTransaction } from '../models/financial-statement-transaction.model';
import { GetFinancialStatementTransactionsParameters } from '../models/parameters/GetFinancialStatementTransactionsParameters.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class FinancialStatementTransactionService {
    private apiUrl = Environment.API_URL + '/FinancialStatementTransaction';

    constructor(protected http: HttpClient, public datePipe: DatePipe) { }

    getList(parameters?: GetFinancialStatementTransactionsParameters): Observable<FinancialStatementTransaction[]> {
        let httpParams = new HttpParams();

        if (parameters) {
            if (parameters.DateFrom) httpParams = httpParams.append('dateFrom', this.datePipe.transform(parameters.DateFrom, 'yyyy-MM-dd')!);
            if (parameters.DateUntil) httpParams = httpParams.append('dateUntil', this.datePipe.transform(parameters.DateUntil, 'yyyy-MM-dd')!);
            if (parameters.Type || parameters.Type == 0) httpParams = httpParams.append('type', parameters.Type.toString());
            if (parameters.CurrencyId) httpParams = httpParams.append('currencyId', parameters.CurrencyId);
            if (parameters.Recurrance || parameters.Recurrance == 0) httpParams = httpParams.append('recurrance', parameters.Recurrance.toString());
            if (parameters.Description) httpParams = httpParams.append('description', parameters.Description);
        }

        return this.http.get<FinancialStatementTransaction[]>(this.apiUrl, { params: httpParams });
    }

    getById(id: string): Observable<FinancialStatementTransaction> {
        return this.http.get<FinancialStatementTransaction>(`${this.apiUrl}/${id}`);
    }
}