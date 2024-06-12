import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelSalesOrderComponent } from './order.component';
import { DatePipe } from '@angular/common';
import { OrderService } from 'src/app/shared/services/order.service';
import { TestDataOrders } from 'src/assets/test-data/Orders';
import { of } from 'rxjs';

describe('ControlPanelSalesOrderComponent', () => {
  let component: ControlPanelSalesOrderComponent;
  let fixture: ComponentFixture<ControlPanelSalesOrderComponent>;

  let orderServiceSpy: jasmine.SpyObj<OrderService>;

  beforeEach(() => {
    orderServiceSpy = jasmine.createSpyObj('OrderService', ['getList']);
    orderServiceSpy.getList.and.returnValue(of(TestDataOrders));

    TestBed.configureTestingModule({
      declarations: [ControlPanelSalesOrderComponent, DatePipe],
      providers:[
        { provide: OrderService, useValue: orderServiceSpy },
      ]
    });
    fixture = TestBed.createComponent(ControlPanelSalesOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
