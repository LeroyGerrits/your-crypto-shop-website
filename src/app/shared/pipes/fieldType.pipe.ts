import { Pipe, PipeTransform } from '@angular/core';

import { FieldType } from '../enums/FieldType.enum';

@Pipe({ name: 'FieldType' })
export class FieldTypePipe implements PipeTransform {
    constructor() { }

    transform(fieldType: string): string {
        switch (fieldType) {
            case FieldType.CustomerDefined.toString():
                return 'Customer defined';
            default:
                return fieldType.toString();
        }
    }
}