import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

import { Faq } from 'src/app/shared/models/faq.model';
import { FaqCategory } from 'src/app/shared/models/faq-category.model';
import { FaqCategoryService } from 'src/app/shared/services/faq-category.service';
import { FaqService } from 'src/app/shared/services/faq.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'public-website-faq-list',
    templateUrl: './faq-list.component.html',
    standalone: false
})
export class PublicWebsiteFaqListComponent implements OnInit, OnDestroy {
  controlFilter = new FormControl('');
  subscriptionFilter: Subscription | undefined;

  faqCategories: FaqCategory[] | undefined;
  faqCategoriesFiltered: FaqCategory[] | undefined;
  faqs: Faq[] | undefined;
  faqsFiltered: Faq[] | undefined;
  faqsByCategoryId: { [key: string]: Faq[] } = {};

  constructor(
    private faqCategoryService: FaqCategoryService,
    private faqService: FaqService
  ) {
    this.subscriptionFilter = this.controlFilter.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(value => this.filterFaqs(value));
  }

  ngOnInit() {
    this.faqCategoryService.getList().subscribe(faqCategories => { this.faqCategories = faqCategories; this.faqCategoriesFiltered = faqCategories; });
    this.faqService.getList().subscribe(faqs => { this.faqs = faqs; this.faqsFiltered = faqs; this.filterFaqs(null); });
  }

  filterFaqs(value: string | null): void {
    if (value && value.length) {
      this.faqsFiltered = this.faqs?.filter(faq =>
        faq.Title.toLowerCase().includes(value.toString().toLowerCase()) ||
        faq.Keywords?.filter(keyword => keyword.toLowerCase().includes(value.toString().toLowerCase())).length
      );
    }
    else {
      this.faqsFiltered = this.faqs;
    }

    this.faqsByCategoryId = {};
    this.faqsFiltered?.forEach(faq => {
      if (this.faqsByCategoryId[faq.Category.Id]) {
        this.faqsByCategoryId[faq.Category.Id].push(faq);
      } else {
        this.faqsByCategoryId[faq.Category.Id] = [faq];
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptionFilter?.unsubscribe();
  }
}