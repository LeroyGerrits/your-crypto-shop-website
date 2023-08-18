import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { MatGridListModule } from '@angular/material/grid-list';
import { NewsMessageService } from 'src/app/shared/services/NewsMessage.service';
import { PublicWebsiteNewsListComponent } from './news-list.component';

describe('PublicWebsiteNewsListComponent', () => {
  let component: PublicWebsiteNewsListComponent;
  let fixture: ComponentFixture<PublicWebsiteNewsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicWebsiteNewsListComponent],
      imports: [MatGridListModule],
      providers: [HttpClient, HttpHandler, NewsMessageService]
    });
    fixture = TestBed.createComponent(PublicWebsiteNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});