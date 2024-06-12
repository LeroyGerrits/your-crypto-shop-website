import { FaqCategory } from './faq-category.model';

export class Faq {
    Id!: string;
    Category!: FaqCategory;
    Title!: string;
    Keywords?: string[];
    Content?: string;
    SortOrder?: number;
}