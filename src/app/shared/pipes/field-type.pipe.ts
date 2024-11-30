import { Pipe, PipeTransform } from '@angular/core';

import { FieldType } from '../enums/field-type.enum';

@Pipe({
    name: 'FieldType',
    standalone: false
})
export class FieldTypePipe implements PipeTransform {
    constructor() { }

    transform(fieldType: string): string {
        switch (fieldType) {
            case FieldType.CustomerDefined.toString():
                return 'Customer defined';
            default:
                return 'Static';
        }
    }
}