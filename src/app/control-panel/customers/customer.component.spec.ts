import { ActivatedRoute, Router, RouterLink, convertToParamMap } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelCustomerComponent } from './customer.component';
import { TestDataCustomers } from 'src/assets/test-data/Customers';
import { CustomerService } from 'src/app/shared/services/Customer.service';
import { ShopService } from 'src/app/shared/services/Shop.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { of, throwError } from 'rxjs';
import { TestDataShops } from 'src/assets/test-data/Shops';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { CategoryService } from 'src/app/shared/services/Category.service';
import { TestDataCategories } from 'src/assets/test-data/Categories';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { ControlPanelCustomerListComponent } from './customer-list.component';

describe('ControlPanelCustomerComponent', () => {
  let component: ControlPanelCustomerComponent;
  let fixture: ComponentFixture<ControlPanelCustomerComponent>;

  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let customerServiceSpy: jasmine.SpyObj<CustomerService>;
  let shopServiceSpy: jasmine.SpyObj<ShopService>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getList']);
    categoryServiceSpy.getList.and.returnValue(of(TestDataCategories));

    customerServiceSpy = jasmine.createSpyObj('CustomerService', ['getById', 'create', 'update']);
    customerServiceSpy.getById.and.returnValue(of(TestDataCustomers[0]));
    customerServiceSpy.create.and.returnValue(of(mutationResult));
    customerServiceSpy.update.and.returnValue(of(mutationResult));

    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    shopServiceSpy = jasmine.createSpyObj('ShopService', ['getList']);
    shopServiceSpy.getList.and.returnValue(of(TestDataShops));

    TestBed.configureTestingModule({
      declarations: [ControlPanelCustomerComponent],
      imports: [BrowserAnimationsModule, MatCheckboxModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTabsModule, MatTreeModule, ReactiveFormsModule, RouterLink, RouterTestingModule.withRoutes(
        [{ path: 'control-panel/customers', component: ControlPanelCustomerListComponent }]
      )],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ customerId: TestDataCustomers[0].Id, shopId: TestDataCustomers[0].ShopId }) } } },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        { provide: CustomerService, useValue: customerServiceSpy },
        { provide: ShopService, useValue: shopServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(ControlPanelCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not proceed submitting when required form values are not filled in', () => {
    component.controlUsername.setValue('');
    component.onSubmit();
    expect(component.formSubmitted).toBeTrue();
    expect(component.formLoading).toBeFalse();
  });

  it('should send a call to the customer service when creating a new customer', () => {
    component.queryStringCustomerId = '';
    component.queryStringShopId = TestDataCustomers[0].ShopId;
    component.controlShop.setValue(TestDataCustomers[0].ShopId);
    component.controlUsername.setValue(TestDataCustomers[0].Username);
    ///////////////

    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should send a call to the customer service when updating an existing customer', () => {
    component.queryStringCustomerId = TestDataCustomers[0].Id;
    component.queryStringShopId = TestDataCustomers[0].ShopId;
    component.controlShop.setValue(TestDataCustomers[0].ShopId);
    component.controlUsername.setValue(TestDataCustomers[0].Username);
    ///////////

    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should redirect when handling submit result and no errors are applicable', () => {
    const routerstub: Router = TestBed.inject(Router);
    spyOn(routerstub, 'navigate');

    const mutationResult = <MutationResult>{ Constraint: '', ErrorCode: 0, Identity: '', Message: '', Success: true };
    component.handleOnSubmitResult(mutationResult);
    expect(routerstub.navigate).toHaveBeenCalledWith(['/control-panel/catalog/customers']);
  });

  it('should show a message when an unhandled error occurs', () => {
    component.handleOnSubmitError('Unhandled error');
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });

  it('should show an error when handling submit result and an error code is applicable', () => {
    const mutationResult = <MutationResult>{ Constraint: '', ErrorCode: 666, Identity: '', Message: 'Evil error' };
    component.handleOnSubmitResult(mutationResult);
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });
});

describe('ControlPanelCustomerComponentWithErrors', () => {
  let component: ControlPanelCustomerComponent;
  let fixture: ComponentFixture<ControlPanelCustomerComponent>;

  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let customerServiceSpy: jasmine.SpyObj<CustomerService>;
  let shopServiceSpy: jasmine.SpyObj<ShopService>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getList']);
    categoryServiceSpy.getList.and.returnValue(of(TestDataCategories));

    customerServiceSpy = jasmine.createSpyObj('CustomerService', ['getById', 'create', 'update']);
    customerServiceSpy.getById.and.returnValue(of(TestDataCustomers[0]));
    customerServiceSpy.create.and.returnValue(throwError(() => new Error('ERROR')));
    customerServiceSpy.update.and.returnValue(throwError(() => new Error('ERROR')));

    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    shopServiceSpy = jasmine.createSpyObj('ShopService', ['getList']);
    shopServiceSpy.getList.and.returnValue(of(TestDataShops));

    TestBed.configureTestingModule({
      declarations: [ControlPanelCustomerComponent],
      imports: [BrowserAnimationsModule, MatCheckboxModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTabsModule, MatTreeModule, ReactiveFormsModule, RouterLink, RouterTestingModule.withRoutes(
        [{ path: 'control-panel/catalog/customers', component: ControlPanelCustomerListComponent }]
      )],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ customerId: 'new', shopId: TestDataCustomers[0].ShopId }) } } },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        { provide: CustomerService, useValue: customerServiceSpy },
        { provide: ShopService, useValue: shopServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(ControlPanelCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should trigger error handling when sending a call to the customer service when creating a new customer and the request fails', () => {
    component.queryStringCustomerId = '';
    component.queryStringShopId = TestDataCustomers[0].ShopId;
    component.controlShop.setValue(TestDataCustomers[0].ShopId);
    component.controlUsername.setValue(TestDataCustomers[0].Username);
    /////////

    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should trigger error handling when sending a call to the customer service when updating an customer shop and the request fails', () => {
    component.queryStringCustomerId = TestDataCustomers[0].Id;
    component.queryStringShopId = TestDataCustomers[0].ShopId;
    component.controlShop.setValue(TestDataCustomers[0].ShopId);
    component.controlUsername.setValue(TestDataCustomers[0].Username);
    /////////

    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });
});