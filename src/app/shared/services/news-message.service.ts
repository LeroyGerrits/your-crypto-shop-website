import { Environment } from 'src/app/shared/environments/-environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewsMessage } from 'src/app/shared/models/news-message.model';
import { Observable } from 'rxjs';

@Injectable()
export class NewsMessageService {
    private apiUrl = Environment.API_URL + '/NewsMessage';

    constructor(protected http: HttpClient) { }

    getList(): Observable<NewsMessage[]> {
        return this.http.get<NewsMessage[]>(this.apiUrl);
    }

    getById(id: string): Observable<NewsMessage> {
        return this.http.get<NewsMessage>(`${this.apiUrl}/${id}`);
    }
}