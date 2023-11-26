import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlPanelCustomerListComponent } from './customer-list.component';
import { CustomerService } from 'src/app/shared/services/Customer.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ShopService } from 'src/app/shared/services/Shop.service';

describe('ControlPanelCustomerListComponent', () => {
  let component: ControlPanelCustomerListComponent;
  let fixture: ComponentFixture<ControlPanelCustomerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlPanelCustomerListComponent],
      imports: [BrowserAnimationsModule, HttpClientTestingModule, MatIconModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatTableModule, ReactiveFormsModule, RouterLink, RouterTestingModule.withRoutes(
        [{ path: 'control-panel/customers', component: ControlPanelCustomerListComponent }]
      )],
      providers: [
        CustomerService,
        ShopService
      ]
    });
    fixture = TestBed.createComponent(ControlPanelCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
