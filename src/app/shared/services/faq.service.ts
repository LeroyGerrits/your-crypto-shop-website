import { Environment } from 'src/app/shared/environments/-environment';
import { Faq } from 'src/app/shared/models/faq.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class FaqService {
    private apiUrl = Environment.API_URL + '/Faq';

    constructor(protected http: HttpClient) { }

    getList(): Observable<Faq[]> {
        return this.http.get<Faq[]>(this.apiUrl);
    }

    getById(id: string): Observable<Faq> {
        return this.http.get<Faq>(`${this.apiUrl}/${id}`);
    }
}