import { FaqCategory } from "./FaqCategory.model";

export class Faq {
    Id!: string;
    Category!: FaqCategory;
    Title!: string;
    Keywords?: string[];
    Content?: string;
    SortOrder?: number;

    SearchEngineFriendlyTitle: string = this.Title != null ? this.Title.trim().replace(/\W+/g, '-').toLowerCase() : '';
}