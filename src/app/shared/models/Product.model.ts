export class Product {
    Id!: string;
    ShopId!: string;
    Name!: string;
    Description?: string;
    Stock?: number;
    Price!: number;
    Visible!: boolean;
    ShowOnHome!: boolean;
    MainPhotoId?: string;
    MainPhotoExtension?: string;
}