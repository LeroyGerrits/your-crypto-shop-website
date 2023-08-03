import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'stripHtml' })
export class StripHtmlPipe implements PipeTransform {

    constructor() { }

    transform(text: string) {
        if (!text) {
            return text;
        }

        return text.replace(/<(?:.|\n)*?>/gm, ' ');
    }
}