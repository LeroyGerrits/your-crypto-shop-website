import { HttpClient, HttpParams } from '@angular/common/http';

import { Currency } from 'src/app/shared/models/currency.model';
import { Environment } from 'src/app/shared/environments/-environment';
import { GetCurrenciesParameters } from '../models/parameters/get-currencies-parameters.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CurrencyService {
    private apiUrl = Environment.API_URL + '/Currency';

    constructor(protected http: HttpClient) { }

    getList(parameters?: GetCurrenciesParameters): Observable<Currency[]> {
        let httpParams = new HttpParams();

        if (parameters) {
            if (parameters.Type || parameters.Type == 0) httpParams = httpParams.append('type', parameters.Type.toString());
            if (parameters.Symbol) httpParams = httpParams.append('symbol', parameters.Symbol);
            if (parameters.Code) httpParams = httpParams.append('code', parameters.Code);
            if (parameters.Name) httpParams = httpParams.append('name', parameters.Name);
            if (parameters.Supported != null) httpParams = httpParams.append('supported', parameters.Supported);
        }

        return this.http.get<Currency[]>(this.apiUrl, { params: httpParams });
    }

    getById(id: string): Observable<Currency> {
        return this.http.get<Currency>(`${this.apiUrl}/${id}`);
    }
}