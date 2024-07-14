import { HttpClient, HttpParams } from '@angular/common/http';

import { Environment } from 'src/app/shared/environments/environment';
import { Field } from 'src/app/shared/models/field.model';
import { GetFieldsParameters } from '../models/parameters/get-fields-parameters.model';
import { Injectable } from '@angular/core';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { Observable } from 'rxjs';

@Injectable()
export class FieldService {
    private apiUrl = Environment.API_URL + '/Field';

    constructor(protected http: HttpClient) { }

    getList(parameters?: GetFieldsParameters): Observable<Field[]> {
        let httpParams = new HttpParams();

        if (parameters) {
            if (parameters.Name) httpParams = httpParams.append('name', parameters.Name);
            if (parameters.ShopId) httpParams = httpParams.append('shopId', parameters.ShopId);
            if (parameters.Entity != null) httpParams = httpParams.append('entity', parameters.Entity);
            if (parameters.Type != null) httpParams = httpParams.append('type', parameters.Type);
            if (parameters.DataType != null) httpParams = httpParams.append('dataType', parameters.DataType);
            if (parameters.Visible != null) httpParams = httpParams.append('visible', parameters.Visible);
        }

        return this.http.get<Field[]>(this.apiUrl, { params: httpParams });
    }

    getById(id: string): Observable<Field> {
        return this.http.get<Field>(`${this.apiUrl}/${id}`);
    }

    create(field: Field): Observable<MutationResult> {
        return this.http.post<MutationResult>(this.apiUrl, field);
    }

    update(field: Field): Observable<MutationResult> {
        return this.http.put<MutationResult>(`${this.apiUrl}/${field.Id}`, field)
    }

    delete(id: string): Observable<MutationResult> {
        return this.http.delete<MutationResult>(`${this.apiUrl}/${id}`);
    }
}