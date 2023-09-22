import { ActivatedRoute, RouterLink } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { NewsMessageService } from 'src/app/shared/services/NewsMessage.service';
import { PublicWebsiteNewsListComponent } from './news-list.component';
import { SearchEngineFriendlyStringPipe } from 'src/app/shared/pipes/SearchEngineFriendlyString.pipe';
import { TestDataNewsMessages } from 'src/assets/test-data/NewsMessages';
import { of } from 'rxjs';

describe('PublicWebsiteNewsListComponent', () => {
  let component: PublicWebsiteNewsListComponent;
  let fixture: ComponentFixture<PublicWebsiteNewsListComponent>;

  let newsMessageServiceSpy: jasmine.SpyObj<NewsMessageService>;

  beforeEach(() => {
    newsMessageServiceSpy = jasmine.createSpyObj('NewsMessageService', ['getList']);
    newsMessageServiceSpy.getList.and.returnValue(of(TestDataNewsMessages));

    TestBed.configureTestingModule({
      declarations: [PublicWebsiteNewsListComponent, SearchEngineFriendlyStringPipe],
      imports: [MatGridListModule, MatCardModule, RouterLink],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 0, }, }, } },
        { provide: NewsMessageService, useValue: newsMessageServiceSpy },
        HttpClient,
        HttpHandler
      ]
    });
    fixture = TestBed.createComponent(PublicWebsiteNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});