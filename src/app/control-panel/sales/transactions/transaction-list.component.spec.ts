import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelSalesTransactionListComponent } from './transaction-list.component';

describe('ControlPanelSalesTransactionListComponent', () => {
  let component: ControlPanelSalesTransactionListComponent;
  let fixture: ComponentFixture<ControlPanelSalesTransactionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlPanelSalesTransactionListComponent]
    });
    fixture = TestBed.createComponent(ControlPanelSalesTransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
