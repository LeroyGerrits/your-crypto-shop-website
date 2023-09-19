import { ActivatedRoute, RouterLink, convertToParamMap } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqService } from 'src/app/shared/services/Faq.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatChipsModule } from '@angular/material/chips';
import { PublicWebsiteFaqComponent } from './faq.component';
import { TestDataFaqs } from 'src/assets/test-data/Faqs';
import { of } from 'rxjs';

describe('PublicWebsiteFaqComponent', () => {
  let component: PublicWebsiteFaqComponent;
  let fixture: ComponentFixture<PublicWebsiteFaqComponent>;
  
  let faqServiceSpy: jasmine.SpyObj<FaqService>;

  beforeEach(() => {
    faqServiceSpy = jasmine.createSpyObj('FaqService', ['getById']);
    faqServiceSpy.getById.and.returnValue(of(TestDataFaqs[0]));

    TestBed.configureTestingModule({
      declarations: [PublicWebsiteFaqComponent],
      imports: [RouterLink, MatChipsModule, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ faqId: TestDataFaqs[0].Id }) } } },
        { provide: FaqService, useValue: faqServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(PublicWebsiteFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve a FAQ', () => {
    component.GetFaq(TestDataFaqs[0].Id);
    expect(faqServiceSpy.getById).toHaveBeenCalled();
  });
});