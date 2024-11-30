import { Component, OnInit } from '@angular/core';

import { NewsMessage } from 'src/app/shared/models/news-message.model';
import { NewsMessageService } from 'src/app/shared/services/news-message.service';

@Component({
    selector: 'public-website-news-list',
    templateUrl: './news-list.component.html',
    styleUrl: './news-list.component.scss',
    standalone: false
})
export class PublicWebsiteNewsListComponent implements OnInit {
  newsMessages: NewsMessage[] | undefined;

  constructor(
    private newsMessageService: NewsMessageService
  ) { }

  ngOnInit() {
    this.newsMessageService.getList().subscribe(newsMessages => {
      this.newsMessages = newsMessages;
    });
  }
}