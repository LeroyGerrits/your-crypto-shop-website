import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Faq } from 'src/app/shared/models/Faq.model';
import { FaqService } from 'src/app/shared/services/Faq.service';
import { of } from 'rxjs'

@Component({
  selector: 'public-website-faq',
  templateUrl: './faq.component.html'
})
export class PublicWebsiteFaqComponent implements OnInit {
  public faq: Faq | undefined;
  public faqContent: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private faqService: FaqService
  ) { }

  ngOnInit() {
    const queryStringFaqId = this.route.snapshot.paramMap.get('faqId');

    if (queryStringFaqId) {
      this.GetFaq(queryStringFaqId);
    }
  }

  GetFaq(id: string) {
    this.faqService.getById(id.toString()).subscribe(faq => { this.faq = faq; });
  }
}