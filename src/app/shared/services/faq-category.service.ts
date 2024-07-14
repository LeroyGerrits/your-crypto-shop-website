import { Environment } from 'src/app/shared/environments/environment';
import { FaqCategory } from 'src/app/shared/models/faq-category.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class FaqCategoryService {
    private apiUrl = Environment.API_URL + '/FaqCategory';

    constructor(protected http: HttpClient) { }

    getList(): Observable<FaqCategory[]> {
        return this.http.get<FaqCategory[]>(this.apiUrl);
    }

    getById(id: string): Observable<FaqCategory> {
        return this.http.get<FaqCategory>(`${this.apiUrl}/${id}`);
    }
}