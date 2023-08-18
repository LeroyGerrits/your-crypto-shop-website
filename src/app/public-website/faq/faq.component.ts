import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Faq } from 'src/app/shared/models/Faq.model';
import { FaqService } from 'src/app/shared/services/Faq.service';

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
    const routeParams = this.route.snapshot.paramMap;
    const queryStringFaqId = routeParams.get('faqId');

    if (queryStringFaqId) {
      this.faqService.getById(queryStringFaqId!.toString()).subscribe(faq => { this.faq = faq; });
    }
  }
}