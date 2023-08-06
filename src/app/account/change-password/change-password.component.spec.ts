import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountChangePasswordComponent } from './change-password.component';

describe('AccountChangePasswordComponent', () => {
  let component: AccountChangePasswordComponent;
  let fixture: ComponentFixture<AccountChangePasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountChangePasswordComponent]
    });
    fixture = TestBed.createComponent(AccountChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
