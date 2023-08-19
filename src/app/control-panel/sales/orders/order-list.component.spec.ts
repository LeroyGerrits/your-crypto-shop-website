import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelSalesOrderListComponent } from './order-list.component';

describe('ControlPanelSalesOrderListComponent', () => {
  let component: ControlPanelSalesOrderListComponent;
  let fixture: ComponentFixture<ControlPanelSalesOrderListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlPanelSalesOrderListComponent]
    });
    fixture = TestBed.createComponent(ControlPanelSalesOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
