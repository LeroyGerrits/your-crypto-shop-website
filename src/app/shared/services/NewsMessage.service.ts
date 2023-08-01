import { Environment } from "src/app/shared/environments/Environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NewsMessage } from "../models/NewsMessage.model";
import { Observable } from "rxjs";

@Injectable()
export class NewsMessageService {
    private apiUrl = `${Environment.API_URL}/NewsMessage`;

    constructor(protected http: HttpClient) { }

    getList(): Observable<NewsMessage[]> {
        return this.http.get<NewsMessage[]>(this.apiUrl);
    }

    getById(id: number): Observable<NewsMessage> {
        return this.http.get<NewsMessage>(`${this.apiUrl}/${id}`);
    }

    create(shop: NewsMessage): Observable<NewsMessage> {
        return this.http.post<NewsMessage>(this.apiUrl, shop);
    }

    update(shop: NewsMessage): Observable<NewsMessage> {
        return this.http.put<NewsMessage>(`${this.apiUrl}/${shop.Id}`, shop)
    }
    
    delete(jaar: number): Observable<NewsMessage> {
        return this.http.delete<NewsMessage>(`${this.apiUrl}/${jaar}`);
    }
}