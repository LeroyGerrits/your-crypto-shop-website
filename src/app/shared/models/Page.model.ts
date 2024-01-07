import { Shop } from './Shop.model';

export class Page {
    Id!: string;
    Shop!: Shop;
    Title!: string;
    Content?: string;
    Visible!: boolean;
}