import { Environment } from 'src/app/shared/environments/Environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageCategory } from '../models/PageCategory.model';

@Injectable()
export class PageCategoryService {
    private apiUrl = Environment.API_URL + '/PageCategory';

    constructor(protected http: HttpClient) { }

    getList(): Observable<PageCategory[]> {
        return this.http.get<PageCategory[]>(this.apiUrl);
    }

    getById(id: string): Observable<PageCategory> {
        return this.http.get<PageCategory>(`${this.apiUrl}/${id}`);
    }
}