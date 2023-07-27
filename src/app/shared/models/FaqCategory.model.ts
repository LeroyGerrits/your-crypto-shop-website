export class FaqCategory {
    Id!: string;
    Parent?: FaqCategory;
    Name!: string;
    SortOrder?: number;
    Children?: FaqCategory[];
}