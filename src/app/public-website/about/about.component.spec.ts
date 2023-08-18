import { ActivatedRoute, RouterLink } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicWebsiteAboutComponent } from './about.component';

describe('PublicWebsiteAboutComponent', () => {
  let component: PublicWebsiteAboutComponent;
  let fixture: ComponentFixture<PublicWebsiteAboutComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicWebsiteAboutComponent],
      imports: [RouterLink],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(PublicWebsiteAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});