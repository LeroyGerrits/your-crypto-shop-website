import { Page } from 'src/app/shared/models/Page.model';
import { TestDataShops } from './Shops';

export const TestDataPages: Page[] = [
    {
        Id: '00000000-0000-0000-0000-000000000001',
        Shop: TestDataShops[0],
        Title: 'Page A',
        Visible: true,
        Content: 'This is a page'
    },
    {
        Id: '00000000-0000-0000-0000-000000000002',
        Shop: TestDataShops[0],
        Title: 'Page B',
        Visible: true,
        Content: 'This is another page'
    }
];