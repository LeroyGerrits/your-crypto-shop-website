import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryMethodListComponent } from './delivery-method-list.component';

describe('DeliveryMethodListComponent', () => {
  let component: DeliveryMethodListComponent;
  let fixture: ComponentFixture<DeliveryMethodListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryMethodListComponent]
    });
    fixture = TestBed.createComponent(DeliveryMethodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});