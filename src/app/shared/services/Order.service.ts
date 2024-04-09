import { HttpClient, HttpParams } from '@angular/common/http';

import { DatePipe } from '@angular/common';
import { Environment } from 'src/app/shared/environments/Environment';
import { GetOrdersParameters } from '../models/parameters/GetOrdersParameters.model';
import { Injectable } from '@angular/core';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Observable } from 'rxjs';
import { Order } from 'src/app/shared/models/Order.model';
import { OrderStatus } from '../enums/OrderStatus.enum';

@Injectable()
export class OrderService {
    private apiUrl = Environment.API_URL + '/Order';

    constructor(protected http: HttpClient, protected datePipe: DatePipe) { }

    getList(parameters?: GetOrdersParameters): Observable<Order[]> {
        let httpParams = new HttpParams();

        if (parameters) {
            if (parameters.ShopId) httpParams = httpParams.append('shopId', parameters.ShopId);
            if (parameters.CustomerId) httpParams = httpParams.append('customerId', parameters.CustomerId);
            if (parameters.Status) httpParams = httpParams.append('status', parameters.Status);
            if (parameters.DateFrom) httpParams = httpParams.append('dateFrom', this.datePipe.transform(parameters.DateFrom, 'yyyy-MM-dd')!);
            if (parameters.DateUntil) httpParams = httpParams.append('dateUntil', this.datePipe.transform(parameters.DateUntil, 'yyyy-MM-dd')!);
        }

        return this.http.get<Order[]>(this.apiUrl, { params: httpParams });
    }

    getById(id: string): Observable<Order> {
        return this.http.get<Order>(`${this.apiUrl}/${id}`);
    }

    create(order: Order): Observable<MutationResult> {
        return this.http.post<MutationResult>(this.apiUrl, order);
    }

    update(order: Order): Observable<MutationResult> {
        return this.http.put<MutationResult>(`${this.apiUrl}/${order.Id}`, order)
    }

    updateStatus(id: string, status: OrderStatus): Observable<MutationResult> {
        return this.http.put<MutationResult>(`${this.apiUrl}/${id}/UpdateStatus/${status}`, null)
    }

    delete(id: string): Observable<MutationResult> {
        return this.http.delete<MutationResult>(`${this.apiUrl}/${id}`);
    }
}