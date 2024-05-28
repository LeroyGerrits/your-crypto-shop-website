import { ActivatedRoute, RouterLink } from '@angular/router';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaqCategoryService } from 'src/app/shared/services/faq-category.service';
import { FaqService } from 'src/app/shared/services/-faq.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PublicWebsiteFaqListComponent } from './faq-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchEngineFriendlyStringPipe } from 'src/app/shared/pipes/SearchEngineFriendlyString.pipe';
import { TestDataFaqCategories } from 'src/assets/test-data/FaqCategories';
import { TestDataFaqs } from 'src/assets/test-data/Faqs';
import { of } from 'rxjs';

describe('PublicWebsiteFaqListComponent', () => {
  let component: PublicWebsiteFaqListComponent;
  let fixture: ComponentFixture<PublicWebsiteFaqListComponent>;
  let faqCategoryServiceSpy: jasmine.SpyObj<FaqCategoryService>
  let faqServiceSpy: jasmine.SpyObj<FaqService>;

  beforeEach(() => {
    faqCategoryServiceSpy = jasmine.createSpyObj('FaqCategoryService', ['getList']);
    faqCategoryServiceSpy.getList.and.returnValue(of(TestDataFaqCategories));

    faqServiceSpy = jasmine.createSpyObj('FaqService', ['getList']);
    faqServiceSpy.getList.and.returnValue(of(TestDataFaqs));

    TestBed.configureTestingModule({
      declarations: [PublicWebsiteFaqListComponent, SearchEngineFriendlyStringPipe],
      imports: [BrowserAnimationsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterLink],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 0, }, }, } },
        { provide: FaqCategoryService, useValue: faqCategoryServiceSpy },
        { provide: FaqService, useValue: faqServiceSpy },
        PublicWebsiteFaqListComponent
      ]
    });
    fixture = TestBed.createComponent(PublicWebsiteFaqListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should filter FAQs and categories when text filter gets used', fakeAsync(() => {
    const componentStub: PublicWebsiteFaqListComponent = TestBed.inject(PublicWebsiteFaqListComponent);
    spyOn(componentStub, 'filterFaqs');
    componentStub.controlFilter.setValue('test');
    tick(1000);
    expect(componentStub.filterFaqs).toHaveBeenCalled();
  }));

  it('should filter FAQs and categories and display nothing when text with an unexisting value is entered in the search bar', () => {
    component.filterFaqs('Test with unexisting value');
    expect(component.faqsFiltered?.length).toBe(0);
  });
});