import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelSalesOrderListComponent } from './order-list.component';
import { DatePipe } from '@angular/common';

describe('ControlPanelSalesOrderListComponent', () => {
  let component: ControlPanelSalesOrderListComponent;
  let fixture: ComponentFixture<ControlPanelSalesOrderListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlPanelSalesOrderListComponent],
      imports: [DatePipe]
    });
    fixture = TestBed.createComponent(ControlPanelSalesOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
