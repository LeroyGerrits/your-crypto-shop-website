import { ActivatedRoute, RouterLink } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlPanelConfigurationDeliveryMethodListComponent } from './delivery-method-list.component';
import { DeliveryMethodService } from 'src/app/shared/services/DeliveryMethod.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { ShopService } from 'src/app/shared/services/Shop.service';
import { TestDataDeliveryMethods } from 'src/assets/test-data/DeliveryMethods';
import { TestDataShops } from 'src/assets/test-data/Shops';
import { of } from 'rxjs';

describe('ControlPanelConfigurationDeliveryMethodListComponent', () => {
  let component: ControlPanelConfigurationDeliveryMethodListComponent;
  let fixture: ComponentFixture<ControlPanelConfigurationDeliveryMethodListComponent>;

  let deliveryMethodServiceSpy: jasmine.SpyObj<DeliveryMethodService>;
  let shopServiceSpy: jasmine.SpyObj<ShopService>;

  beforeEach(() => {
    deliveryMethodServiceSpy = jasmine.createSpyObj('DeliveryMethodService', ['getList']);
    deliveryMethodServiceSpy.getList.and.returnValue(of(TestDataDeliveryMethods));
    shopServiceSpy = jasmine.createSpyObj('ShopService', ['getList']);
    shopServiceSpy.getList.and.returnValue(of(TestDataShops));

    TestBed.configureTestingModule({
      declarations: [ControlPanelConfigurationDeliveryMethodListComponent],
      imports: [BrowserAnimationsModule, MatIconModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatTableModule, ReactiveFormsModule, RouterLink],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { data: {} } } },
        { provide: ShopService, useValue: shopServiceSpy },
        { provide: DeliveryMethodService, useVaue: deliveryMethodServiceSpy },
        HttpClient,
        HttpHandler
      ]
    });
    fixture = TestBed.createComponent(ControlPanelConfigurationDeliveryMethodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});