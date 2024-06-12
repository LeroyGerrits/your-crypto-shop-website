import { Shop } from './shop.model';

export class DeliveryMethod {
    Id!: string;
    Shop!: Shop;
    Name!: string;
    Costs?: number;
}