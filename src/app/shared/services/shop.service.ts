import { Environment } from "src/app/shared/environments/Environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Shop } from "../models/Shop.model";

@Injectable()
export class ShopService {
    private apiUrl = `${Environment.API_URL}/Shop`;

    constructor(protected http: HttpClient) { }

    getList(): Observable<Shop[]> {
        return this.http.get<Shop[]>(this.apiUrl);
    }

    getById(id: number): Observable<Shop> {
        return this.http.get<Shop>(`${this.apiUrl}/${id}`);
    }

    create(shop: Shop): Observable<Shop> {
        return this.http.post<Shop>(this.apiUrl, shop);
    }

    update(shop: Shop): Observable<Shop> {
        return this.http.put<Shop>(`${this.apiUrl}/${shop.Id}`, shop)
    }
    
    delete(jaar: number): Observable<Shop> {
        return this.http.delete<Shop>(`${this.apiUrl}/${jaar}`);
    }
}