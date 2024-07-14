import { Page } from 'src/app/shared/models/page.model';
import { TestDataShops } from './-shops';

export const TestDataPages: Page[] = [
    {
        Id: '00000000-0000-0000-0000-000000000001',
        Shop: TestDataShops[0],
        Title: 'Page A',
        Visible: true,
        Content: 'This is a page',
        Index: false
    },
    {
        Id: '00000000-0000-0000-0000-000000000002',
        Shop: TestDataShops[0],
        Title: 'Page B',
        Visible: true,
        Content: 'This is another page',
        Index: false
    }
];