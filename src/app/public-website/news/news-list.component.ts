import { Component, OnInit } from '@angular/core';

import { NewsMessage } from 'src/app/shared/models/NewsMessage.model';
import { NewsMessageService } from 'src/app/shared/services/NewsMessage.service';

@Component({
  selector: 'public-website-news-list',
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss'
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