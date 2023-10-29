import { ActivatedRoute, RouterLink, convertToParamMap } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PublicWebsiteMessageComponent } from './message.component';

describe('PublicWebsiteMessageComponent', () => {
  let component: PublicWebsiteMessageComponent;
  let fixture: ComponentFixture<PublicWebsiteMessageComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [PublicWebsiteMessageComponent],
      imports: [RouterLink, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ messageType: 'account-registered' }) } } },
      ]
    });
    fixture = TestBed.createComponent(PublicWebsiteMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a message', () => {

    expect(component).toBeTruthy();
  });
});