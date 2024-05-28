import { ActivatedRoute, RouterLink, convertToParamMap } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { NewsMessageService } from 'src/app/shared/services/news-message.service';
import { PublicWebsiteNewsComponent } from './news.component';
import { TestDataNewsMessages } from 'src/assets/test-data/NewsMessages';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PublicWebsiteNewsComponent', () => {
  let component: PublicWebsiteNewsComponent;
  let fixture: ComponentFixture<PublicWebsiteNewsComponent>;

  let newsMessageServiceSpy: jasmine.SpyObj<NewsMessageService>;

  beforeEach(() => {
    newsMessageServiceSpy = jasmine.createSpyObj('NewsMessageService', ['getById']);
    newsMessageServiceSpy.getById.and.returnValue(of(TestDataNewsMessages[0]));

    TestBed.configureTestingModule({
    declarations: [PublicWebsiteNewsComponent],
    imports: [RouterLink],
    providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ newsMessageId: TestDataNewsMessages[0].Id }) } } },
        { provide: NewsMessageService, useValue: newsMessageServiceSpy },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    fixture = TestBed.createComponent(PublicWebsiteNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should retrieve a news message', () => {
    component.GetNewsMessage(TestDataNewsMessages[0].Id);
    expect(newsMessageServiceSpy.getById).toHaveBeenCalled();
  });
});