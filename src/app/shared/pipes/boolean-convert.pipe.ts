import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'BooleanConvert',
    standalone: false
})
export class BooleanConvertPipe implements PipeTransform {

    constructor() { }

    transform(text: any): boolean {
        switch (text) {
            case true:
            case "true":
            case 1:
            case "1":
            case "on":
            case "yes":
                return true;
            default:
                return false;
        }
    }
}