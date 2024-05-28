import { Environment } from 'src/app/shared/environments/Environment';
import { HttpClient } from '@angular/common/http';
import { IDictionaryNumber } from '../interfaces/idictionary-number.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stats } from '../models/-stats.model';

@Injectable()
export class GeneralService {
    private apiUrl = Environment.API_URL + '/General';

    constructor(protected http: HttpClient) { }

    getDashboardSales(mode: string): Observable<IDictionaryNumber> {
        return this.http.get<IDictionaryNumber>(`${this.apiUrl}/GetDashboardSales/${mode}`);
    }

    getStats(): Observable<Stats> {
        return this.http.get<Stats>(`${this.apiUrl}/GetStats`);
    }
}