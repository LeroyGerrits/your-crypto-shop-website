import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelSalesOrderComponent } from './order.component';

describe('ControlPanelSalesOrderComponent', () => {
  let component: ControlPanelSalesOrderComponent;
  let fixture: ComponentFixture<ControlPanelSalesOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlPanelSalesOrderComponent]
    });
    fixture = TestBed.createComponent(ControlPanelSalesOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
