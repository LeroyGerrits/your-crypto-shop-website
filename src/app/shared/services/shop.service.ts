import { Environment } from "src/app/shared/environments/Environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MutationResult } from "../models/MutationResult";
import { Observable } from "rxjs";
import { Shop } from "../models/Shop.model";

@Injectable()
export class ShopService {
    private apiUrl = Environment.API_URL + '/Shop';

    constructor(protected http: HttpClient) { }

    getList(): Observable<Shop[]> {
        return this.http.get<Shop[]>(this.apiUrl);
    }

    getById(id: string): Observable<Shop> {
        return this.http.get<Shop>(`${this.apiUrl}/${id}`);
    }

    create(shop: Shop): Observable<MutationResult> {
        return this.http.post<MutationResult>(this.apiUrl, shop);
    }

    update(shop: Shop): Observable<MutationResult> {
        return this.http.put<MutationResult>(`${this.apiUrl}/${shop.Id}`, shop)
    }

    delete(id: string): Observable<MutationResult> {
        return this.http.delete<MutationResult>(`${this.apiUrl}/${id}`);
    }
}