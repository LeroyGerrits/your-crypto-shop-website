import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'truncateHtml' })
export class TruncateHtmlPipe implements PipeTransform {

    constructor() { }

    transform(text: string) {
        if (!text) {
            return text;
        }

        return text.replace(/<(?:.|\n)*?>/gm, ' ');
    }
}