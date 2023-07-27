import { FaqCategory } from "./FaqCategory.model";

export class Faq {
    Id!: string;
    Category?: FaqCategory;
    Title!: string;
    Description?: string;
    SortOrder?: number;
}