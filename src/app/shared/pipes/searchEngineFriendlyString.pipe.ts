import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchEngineFriendlyString' })
export class SearchEngineFriendlyStringPipe implements PipeTransform {
    
    constructor() { }

    transform(text: string) {
        if (!text) {
            return text;
        }
        
        return text.trim().replace(/\W+/g, '-').toLowerCase();
    }
}