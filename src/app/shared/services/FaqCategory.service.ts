import { Environment } from "src/app/shared/environments/Environment";
import { FaqCategory } from "../models/FaqCategory.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class FaqCategoryService {
    private apiUrl = `${Environment.API_URL}/FaqCategory`;

    constructor(protected http: HttpClient) { }

    getList(): Observable<FaqCategory[]> {
        return this.http.get<FaqCategory[]>(this.apiUrl);
    }

    getById(id: number): Observable<FaqCategory> {
        return this.http.get<FaqCategory>(`${this.apiUrl}/${id}`);
    }

    create(shop: FaqCategory): Observable<FaqCategory> {
        return this.http.post<FaqCategory>(this.apiUrl, shop);
    }

    update(shop: FaqCategory): Observable<FaqCategory> {
        return this.http.put<FaqCategory>(`${this.apiUrl}/${shop.Id}`, shop)
    }
    
    delete(jaar: number): Observable<FaqCategory> {
        return this.http.delete<FaqCategory>(`${this.apiUrl}/${jaar}`);
    }
}