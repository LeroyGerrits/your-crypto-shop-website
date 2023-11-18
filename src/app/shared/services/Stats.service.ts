import { Environment } from 'src/app/shared/environments/Environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stats } from '../models/Stats.model';

@Injectable()
export class StatsService {
    private apiUrl = Environment.API_URL + '/Stats';

    constructor(protected http: HttpClient) { }

    get(): Observable<Stats> {
        return this.http.get<Stats>(this.apiUrl);
    }
}