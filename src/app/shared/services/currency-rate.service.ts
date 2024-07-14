import { HttpClient, HttpParams } from '@angular/common/http';

import { Currency } from 'src/app/shared/models/currency.model';
import { CurrencyRate } from '../models/currency-rate.model';
import { Environment } from 'src/app/shared/environments/environment';
import { GetCurrencyRatesParameters } from '../models/parameters/get-currency-rates-parameters.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CurrencyRateService {
    private apiUrl = Environment.API_URL + '/CurrencyRate';

    constructor(protected http: HttpClient) { }

    getList(parameters?: GetCurrencyRatesParameters): Observable<CurrencyRate[]> {
        let httpParams = new HttpParams();

        if (parameters) {
            if (parameters.CurrencyFromId) httpParams = httpParams.append('currencyFromId', parameters.CurrencyFromId);
            if (parameters.CurrencyToId) httpParams = httpParams.append('currencyToId', parameters.CurrencyToId);
        }

        return this.http.get<CurrencyRate[]>(this.apiUrl, { params: httpParams });
    }

    getById(id: string): Observable<Currency> {
        return this.http.get<Currency>(`${this.apiUrl}/${id}`);
    }
}