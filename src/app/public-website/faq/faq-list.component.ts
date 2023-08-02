import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

import { Faq } from 'src/app/shared/models/Faq.model';
import { FaqCategory } from 'src/app/shared/models/FaqCategory.model';
import { FaqCategoryService } from 'src/app/shared/services/FaqCategory.service';
import { FaqService } from 'src/app/shared/services/Faq.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'public-website-faq',
  templateUrl: './faq-list.component.html'
})
export class FaqListComponent implements OnInit, OnDestroy {
  controlFilter = new FormControl('');
  subscriptionFilter: Subscription | undefined;

  filterTimeout: void | undefined;

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

  ngOnInit(): void {
    this.faqCategoryService.getList().subscribe(faqCategories => { this.faqCategories = faqCategories; this.faqCategoriesFiltered = faqCategories; });
    this.faqService.getList().subscribe(faqs => { this.faqs = faqs; this.faqsFiltered = faqs; this.filterFaqs(null); });
  }

  filterFaqs(value: string | null): void {
    if (value && value.length) {
      this.faqsFiltered = this.faqs?.filter(f => f.Title.toLowerCase().includes(value.toString().toLowerCase()) || f.Keywords?.toLowerCase().includes(value.toString().toLowerCase()));
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
