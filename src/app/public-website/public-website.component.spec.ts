import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicWebsiteComponent } from './public-website.component';

describe('PublicWebsiteComponent', () => {
  let component: PublicWebsiteComponent;
  let fixture: ComponentFixture<PublicWebsiteComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicWebsiteComponent],
      imports: [RouterLink, RouterLinkActive, RouterOutlet],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(PublicWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});