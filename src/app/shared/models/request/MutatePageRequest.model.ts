import { Page } from "../Page.model";

export class MutatePageRequest {
    Page!: Page;
    CheckedCategories?: string;
}