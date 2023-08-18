import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { PublicWebsiteNewsComponent } from './news.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PublicWebsiteNewsComponent', () => {
  let component: PublicWebsiteNewsComponent;
  let fixture: ComponentFixture<PublicWebsiteNewsComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicWebsiteNewsComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(PublicWebsiteNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});