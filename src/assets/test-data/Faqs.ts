import { Faq } from 'src/app/shared/models/Faq.model';

export const TestDataFaqs: Faq[] = [
    {
        Id: '00000000-0000-0000-0000-000000000001',
        Category: {
            Id: '00000000-0000-0000-0000-000000000011',
            Name: 'Test category 1'
        },
        Title: 'Test FAQ 1',
        Keywords: ['A', 'B', 'C']
    },
    {
        Id: '00000000-0000-0000-0000-000000000001',
        Category: {
            Id: '00000000-0000-0000-0000-000000000011',
            Name: 'Test category'
        },
        Title: 'Test FAQ',
        Keywords: ['A', 'B', 'C']
    }
];