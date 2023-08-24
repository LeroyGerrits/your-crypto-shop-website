import { ActivatedRoute, RouterLink, convertToParamMap } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { FaqService } from 'src/app/shared/services/Faq.service';
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
      imports: [RouterLink, MatChipsModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ faqId: '00000000-0000-0000-0000-000000000001' }) } } },
        { provide: FaqService, useValue: faqServiceSpy },
        HttpClient,
        HttpHandler
      ]
    });
    fixture = TestBed.createComponent(PublicWebsiteFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve a FAQ record', () => {
    component.GetFaq('00000000-0000-0000-0000-000000000001');
    expect(faqServiceSpy.getById).toHaveBeenCalled();
  });
});