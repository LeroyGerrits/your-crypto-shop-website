import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDashboardComponent } from './dashboard.component';

describe('AccountDashboardComponent', () => {
  let component: AccountDashboardComponent;
  let fixture: ComponentFixture<AccountDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountDashboardComponent]
    });
    fixture = TestBed.createComponent(AccountDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
