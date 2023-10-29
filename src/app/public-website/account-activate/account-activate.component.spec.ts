import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { PublicWebsiteAccountActivateComponent } from './account-activate.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PublicWebsiteAccountActivateComponent', () => {
  let component: PublicWebsiteAccountActivateComponent;
  let fixture: ComponentFixture<PublicWebsiteAccountActivateComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicWebsiteAccountActivateComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(PublicWebsiteAccountActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});