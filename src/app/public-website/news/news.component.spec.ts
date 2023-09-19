import { ActivatedRoute, RouterLink, convertToParamMap } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NewsMessageService } from 'src/app/shared/services/NewsMessage.service';
import { PublicWebsiteNewsComponent } from './news.component';
import { TestDataNewsMessages } from 'src/assets/test-data/NewsMessages';
import { of } from 'rxjs';

describe('PublicWebsiteNewsComponent', () => {
  let component: PublicWebsiteNewsComponent;
  let fixture: ComponentFixture<PublicWebsiteNewsComponent>;

  let newsMessageServiceSpy: jasmine.SpyObj<NewsMessageService>;

  beforeEach(() => {
    newsMessageServiceSpy = jasmine.createSpyObj('NewsMessageService', ['getById']);
    newsMessageServiceSpy.getById.and.returnValue(of(TestDataNewsMessages[0]));

    TestBed.configureTestingModule({
      declarations: [PublicWebsiteNewsComponent],
      imports: [RouterLink, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ newsMessageId: TestDataNewsMessages[0].Id }) } } },
        { provide: NewsMessageService, useValue: newsMessageServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(PublicWebsiteNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve a news message', () => {
    component.GetNewsMessage(TestDataNewsMessages[0].Id);
    expect(newsMessageServiceSpy.getById).toHaveBeenCalled();
  });
});