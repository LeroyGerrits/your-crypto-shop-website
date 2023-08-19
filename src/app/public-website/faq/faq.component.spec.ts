import { ActivatedRoute, RouterLink, convertToParamMap } from '@angular/router';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Faq } from 'src/app/shared/models/Faq.model';
import { FaqCategoryService } from 'src/app/shared/services/FaqCategory.service';
import { FaqService } from 'src/app/shared/services/Faq.service';
import { PublicWebsiteFaqComponent } from './faq.component';

const mockFaq: Faq = {
  Id: '00000000-0000-0000-0000-000000000001',
  Category: {
    Id: '00000000-0000-0000-0000-000000000011',
    Name: 'Text Category'
  },
  Title: 'Test FAQ'
}
const mockFaqs = [mockFaq];

class FaqServiceMock {
  getById(id: string): Observable<Faq> {
    return of({
      Id: '00000000-0000-0000-0000-000000000001',
      Category: {
        Id: '00000000-0000-0000-0000-000000000011',
        Name: 'Text Category'
      },
      Title: 'Test FAQ'
    })
  }
}

describe('PublicWebsiteFaqComponent', () => {
  let component: PublicWebsiteFaqComponent;
  let fixture: ComponentFixture<PublicWebsiteFaqComponent>;
  let mockFaqService: jasmine.SpyObj<FaqServiceMock>;

  beforeEach(() => {
    mockFaqService = jasmine.createSpyObj('FaqServiceMock', ['getById']);
    TestBed.configureTestingModule({
      declarations: [PublicWebsiteFaqComponent],
      imports: [RouterLink],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ faqId: '' }) } } },
        { provide: FaqService, useValue: mockFaqService },
        FaqCategoryService,
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
    const getFaqServiceSpy = of(mockFaqService.getById('00000000-0000-0000-0000-000000000001'));
    component.GetFaq('00000000-0000-0000-0000-000000000001');
    expect(getFaqServiceSpy).toHaveBeenCalled();
    //expect(component.faq).toBeObservable(mockFaq);
  });
});