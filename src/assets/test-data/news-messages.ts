import { NewsMessage } from 'src/app/shared/models/news-message.model';

export const TestDataNewsMessages: NewsMessage[] = [
    {
        Id: '00000000-0000-0000-0000-000000000001',
        Title: 'Newsmessage test 1',
        Date: new Date(),
        ThumbnailUrl: '',
        Intro: 'This is the intro text for news message 1.',
        Content: 'This is the rest of the text for news message 1.'
    },
    {
        Id: '00000000-0000-0000-0000-000000000002',
        Title: 'Newsmessage test 2',
        Date: new Date(),
        ThumbnailUrl: '',
        Intro: 'This is the intro text for news message 2.',
        Content: 'This is the rest of the text for news message 2.'
    },
];