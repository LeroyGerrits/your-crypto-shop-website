import { ActivatedRoute, RouterLink } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { FaqCategoryService } from 'src/app/shared/services/FaqCategory.service';
import { FaqService } from 'src/app/shared/services/Faq.service';
import { PublicWebsiteFaqComponent } from './faq.component';

describe('PublicWebsiteFaqComponent', () => {
  let component: PublicWebsiteFaqComponent;
  let fixture: ComponentFixture<PublicWebsiteFaqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicWebsiteFaqComponent],
      imports: [RouterLink],
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
        FaqCategoryService,
        FaqService,
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
});