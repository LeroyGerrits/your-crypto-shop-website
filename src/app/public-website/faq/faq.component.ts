import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { ActivatedRoute } from '@angular/router';
import { Constants } from 'src/app/shared/constants';
import { Faq } from 'src/app/shared/models/faq.model';
import { FaqService } from 'src/app/shared/services/faq.service';

@Component({
    selector: 'public-website-faq',
    templateUrl: './faq.component.html',
    standalone: false
})
export class PublicWebsiteFaqComponent implements OnInit {
  public faq: Faq | undefined;

  constructor(
    private route: ActivatedRoute,
    private faqService: FaqService,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit() {
    const queryStringFaqId = this.route.snapshot.paramMap.get('faqId');

    if (queryStringFaqId) {
      this.GetFaq(queryStringFaqId);
    }
  }

  GetFaq(id: string) {
    this.faqService.getById(id.toString()).subscribe(faq => {
      this.faq = faq;
      this.titleService.setTitle(`${Constants.TITLE_PREFIX} - ${faq.Title}`);

      if (faq.Keywords)
        this.metaService.addTag({ name: 'keywords', content: faq.Keywords.toString() });
    });
  }
}