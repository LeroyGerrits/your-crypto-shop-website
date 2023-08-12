import { Category } from 'src/app/shared/models/Category.model';
import { Environment } from 'src/app/shared/environments/Environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Observable } from 'rxjs';

@Injectable()
export class CategoryService {
    private apiUrl = Environment.API_URL + '/Shop';

    constructor(protected http: HttpClient) { }

    getList(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiUrl);
    }

    getById(id: string): Observable<Category> {
        return this.http.get<Category>(`${this.apiUrl}/${id}`);
    }

    create(category: Category): Observable<MutationResult> {
        return this.http.post<MutationResult>(this.apiUrl, category);
    }

    update(category: Category): Observable<MutationResult> {
        return this.http.put<MutationResult>(`${this.apiUrl}/${category.Id}`, category)
    }

    delete(id: string): Observable<MutationResult> {
        return this.http.delete<MutationResult>(`${this.apiUrl}/${id}`);
    }
}