import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Constants } from 'src/app/shared/-constants';
import { NewsMessage } from 'src/app/shared/models/news-message.model';
import { NewsMessageService } from 'src/app/shared/services/news-message.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'public-website-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})

export class PublicWebsiteNewsComponent implements OnInit {
  public newsMessage: NewsMessage | undefined;

  constructor(
    private route: ActivatedRoute,
    private newsMessageService: NewsMessageService,
    private titleService: Title
  ) { }

  ngOnInit() {
    const queryStringNewsMessageId = this.route.snapshot.paramMap.get('newsMessageId');

    if (queryStringNewsMessageId) {
      this.GetNewsMessage(queryStringNewsMessageId);
    }
  }

  GetNewsMessage(id: string) {
    this.newsMessageService.getById(id.toString()).subscribe(newsMessage => {
      this.newsMessage = newsMessage;
      this.titleService.setTitle(`${Constants.TITLE_PREFIX} - ${newsMessage.Title}`);
    });
  }
}