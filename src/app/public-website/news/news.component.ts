import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { NewsMessage } from 'src/app/shared/models/NewsMessage.model';
import { NewsMessageService } from 'src/app/shared/services/NewsMessage.service';

@Component({
  selector: 'public-website-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})

export class PublicWebsiteNewsComponent implements OnInit {
  public newsMessage: NewsMessage | undefined;

  constructor(
    private route: ActivatedRoute,
    private newsMessageService: NewsMessageService
  ) { }

  ngOnInit() {
    const queryStringNewsMessageId = this.route.snapshot.paramMap.get('newsMessageId');

    if (queryStringNewsMessageId) {
      this.GetNewsMessage(queryStringNewsMessageId);
    }
  }

  GetNewsMessage(id: string) {
    this.newsMessageService.getById(id.toString()).subscribe(newsMessage => this.newsMessage = newsMessage );
  }
}
