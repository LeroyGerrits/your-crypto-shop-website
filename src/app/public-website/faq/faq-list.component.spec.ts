import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaqCategoryService } from 'src/app/shared/services/FaqCategory.service';
import { FaqService } from 'src/app/shared/services/Faq.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PublicWebsiteFaqListComponent } from './faq-list.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('PublicWebsiteFaqListComponent', () => {
  let component: PublicWebsiteFaqListComponent;
  let fixture: ComponentFixture<PublicWebsiteFaqListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicWebsiteFaqListComponent],
      imports: [BrowserAnimationsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
      providers: [
        FaqCategoryService,
        FaqService,
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
});