import { Environment } from 'src/app/shared/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShopCategory } from '../models/shop-category.model';

@Injectable()
export class ShopCategoryService {
    private apiUrl = Environment.API_URL + '/ShopCategory';

    constructor(protected http: HttpClient) { }

    getList(): Observable<ShopCategory[]> {
        return this.http.get<ShopCategory[]>(this.apiUrl);
    }

    getById(id: string): Observable<ShopCategory> {
        return this.http.get<ShopCategory>(`${this.apiUrl}/${id}`);
    }
}