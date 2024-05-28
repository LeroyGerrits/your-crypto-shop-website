import { Shop } from './-shop.model';

export class Page {
    Id!: string;
    Shop!: Shop;
    Title!: string;
    Content?: string;
    Visible!: boolean;
    Index!: boolean;
}