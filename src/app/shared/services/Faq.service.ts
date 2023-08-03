import { Environment } from "src/app/shared/environments/Environment";
import { Faq } from "../models/Faq.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class FaqService {
    private apiUrl = `${Environment.API_URL}/Faq`;

    constructor(protected http: HttpClient) { }

    getList(): Observable<Faq[]> {
        return this.http.get<Faq[]>(this.apiUrl);
    }

    getById(id: string): Observable<Faq> {
        return this.http.get<Faq>(`${this.apiUrl}/${id}`);
    }

    create(shop: Faq): Observable<Faq> {
        return this.http.post<Faq>(this.apiUrl, shop);
    }

    update(shop: Faq): Observable<Faq> {
        return this.http.put<Faq>(`${this.apiUrl}/${shop.Id}`, shop)
    }
    
    delete(id: string): Observable<Faq> {
        return this.http.delete<Faq>(`${this.apiUrl}/${id}`);
    }
}