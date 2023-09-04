import { Faq } from 'src/app/shared/models/Faq.model';
import { TestDataFaqCategories } from './FaqCategories';

export const TestDataFaqs: Faq[] = [
    {
        Id: '00000000-0000-0000-0000-000000000001',
        Category: TestDataFaqCategories[0],
        Title: 'Test FAQ 1',
        Keywords: ['A', 'B', 'C']
    },
    {
        Id: '00000000-0000-0000-0000-000000000001',
        Category: TestDataFaqCategories[0],
        Title: 'Test FAQ',
        Keywords: ['A', 'B', 'C']
    }
];