import { ActivatedRoute, RouterLink } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountChangePasswordComponent } from './change-password.component';

describe('AccountChangePasswordComponent', () => {
  let component: AccountChangePasswordComponent;
  let fixture: ComponentFixture<AccountChangePasswordComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountChangePasswordComponent],
      imports: [RouterLink],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ]
    });
    fixture = TestBed.createComponent(AccountChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});