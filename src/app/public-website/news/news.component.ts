import { Component } from '@angular/core';
import { NewsMessage } from 'src/app/shared/models/NewsMessage.model';

@Component({
  selector: 'public-website-news',
  templateUrl: './news.component.html'
})

export class PublicWebsiteNewsComponent {
  public newsMessage: NewsMessage = new NewsMessage();
}
