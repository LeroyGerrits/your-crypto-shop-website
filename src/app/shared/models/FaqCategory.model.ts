export class FaqCategory {
    Id!: string;
    Parent?: FaqCategory;
    Name!: string;    
    Children?: FaqCategory[];
    SortOrder?: number;
}