import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { PublicWebsiteResetPasswordComponent } from './reset-password.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PublicWebsiteResetPasswordComponent', () => {
  let component: PublicWebsiteResetPasswordComponent;
  let fixture: ComponentFixture<PublicWebsiteResetPasswordComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicWebsiteResetPasswordComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(PublicWebsiteResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});