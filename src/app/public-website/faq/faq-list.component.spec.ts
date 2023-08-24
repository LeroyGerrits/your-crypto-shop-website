import { ActivatedRoute, RouterLink } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaqCategoryService } from 'src/app/shared/services/FaqCategory.service';
import { FaqService } from 'src/app/shared/services/Faq.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PublicWebsiteFaqListComponent } from './faq-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchEngineFriendlyStringPipe } from 'src/app/shared/pipes/searchEngineFriendlyString.pipe';
import { TestDataFaqCategories } from 'src/assets/test-data/FaqCategory';
import { TestDataFaqs } from 'src/assets/test-data/Faq';
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
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: {
                get: () => 0,
              },
            },
          }
        },
        { provide: FaqCategoryService, useValue: faqCategoryServiceSpy },
        { provide: FaqService, useValue: faqServiceSpy },
        HttpClient,
        HttpHandler        
      ]
    });
    fixture = TestBed.createComponent(PublicWebsiteFaqListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter FAQs and categories when text is entered in the search bar', () => {
    component.filterFaqs('Test with unexisting value');
    expect(component.faqsFiltered?.length).toBe(0);
  });
});