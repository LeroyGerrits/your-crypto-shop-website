import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Constants } from 'src/app/shared/Constants';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'public-website-message',
  templateUrl: './message.component.html'
})
export class PublicWebsiteMessageComponent implements OnInit {
  public messageTitle: string = '';
  public message: string = '';

  constructor(
    private route: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit() {
    const queryStringMessageType = this.route.snapshot.paramMap.get('messageType');

    if (queryStringMessageType) {
      switch (queryStringMessageType) {
        case 'account-registered':
          this.messageTitle = 'Your account was registered';
          this.message = 'Before you can use your account, you will need to activate it first. Please follow the instructions of the e-mail we just sent to the address you specified.';
          break;
        default:
          this.messageTitle = '';
          this.message = '';
          break;
      }

      this.titleService.setTitle(`${Constants.TITLE_PREFIX} - ${this.messageTitle}`);
    }
  }
}