import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelSalesTransactionComponent } from './transaction.component';

describe('ControlPanelSalesTransactionComponent', () => {
  let component: ControlPanelSalesTransactionComponent;
  let fixture: ComponentFixture<ControlPanelSalesTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlPanelSalesTransactionComponent]
    });
    fixture = TestBed.createComponent(ControlPanelSalesTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
