import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterLink, convertToParamMap } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { CategoryService } from 'src/app/shared/services/-category.service';
import { CountryService } from 'src/app/shared/services/-country.service';
import { CustomerService } from 'src/app/shared/services/-customer.service';
import { ShopService } from 'src/app/shared/services/-shop.service';
import { TestDataCategories } from 'src/assets/test-data/Categories';
import { TestDataCountries } from 'src/assets/test-data/Countries';
import { TestDataCustomers } from 'src/assets/test-data/Customers';
import { TestDataShops } from 'src/assets/test-data/Shops';
import { ControlPanelCustomerListComponent } from './customer-list.component';
import { ControlPanelCustomerComponent } from './customer.component';
import { TestDataAddresses } from 'src/assets/test-data/-addresses';
import { Gender } from 'src/app/shared/enums/gender.enum';

describe('ControlPanelCustomerComponent', () => {
  let component: ControlPanelCustomerComponent;
  let fixture: ComponentFixture<ControlPanelCustomerComponent>;

  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let countryServiceSpy: jasmine.SpyObj<CountryService>;
  let customerServiceSpy: jasmine.SpyObj<CustomerService>;
  let shopServiceSpy: jasmine.SpyObj<ShopService>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getList']);
    categoryServiceSpy.getList.and.returnValue(of(TestDataCategories));

    countryServiceSpy = jasmine.createSpyObj('CountryService', ['getList']);
    countryServiceSpy.getList.and.returnValue(of(TestDataCountries));

    customerServiceSpy = jasmine.createSpyObj('CustomerService', ['getById', 'create', 'update']);
    customerServiceSpy.getById.and.returnValue(of(TestDataCustomers[0]));
    customerServiceSpy.create.and.returnValue(of(mutationResult));
    customerServiceSpy.update.and.returnValue(of(mutationResult));

    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    shopServiceSpy = jasmine.createSpyObj('ShopService', ['getList']);
    shopServiceSpy.getList.and.returnValue(of(TestDataShops));

    TestBed.configureTestingModule({
      declarations: [ControlPanelCustomerComponent],
      imports: [BrowserAnimationsModule, MatCheckboxModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTabsModule, MatRadioModule, MatTreeModule, ReactiveFormsModule, RouterLink, RouterTestingModule.withRoutes(
        [{ path: 'control-panel/customers', component: ControlPanelCustomerListComponent }]
      )],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ customerId: TestDataCustomers[0].Id, shopId: TestDataCustomers[0].ShopId }) } } },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: CountryService, useValue: countryServiceSpy },
        { provide: CustomerService, useValue: customerServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        { provide: ShopService, useValue: shopServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(ControlPanelCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should select the male gender radio button when customer is male', () => {
    TestDataCustomers[0].Gender = Gender.Male;
    component.onRetrieveCustomerData(TestDataCustomers[0]);
    expect(component).toBeTruthy();
  });

  it('should select the female gender radio button when customer is female', () => {
    TestDataCustomers[0].Gender = Gender.Female;
    component.onRetrieveCustomerData(TestDataCustomers[0]);
    expect(component).toBeTruthy();
  });

  it('should select the unspecified gender radio button when customer does not have specified gender', () => {
    TestDataCustomers[0].Gender = Gender.Unspecified;
    component.onRetrieveCustomerData(TestDataCustomers[0]);
    expect(component).toBeTruthy();
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
    component.controlEmailAddress.setValue(TestDataCustomers[0].EmailAddress);
    component.controlUsername.setValue(TestDataCustomers[0].Username);
    component.controlGender.setValue(TestDataCustomers[0].Gender.toString());
    component.controlFirstName.setValue(TestDataCustomers[0].FirstName!);
    component.controlLastName.setValue(TestDataCustomers[0].LastName);
    component.controlAddressLine1.setValue(TestDataAddresses[0].AddressLine1);
    component.controlAddressLine2.setValue(TestDataAddresses[0].AddressLine2!);
    component.controlPostalCode.setValue(TestDataAddresses[0].PostalCode);
    component.controlCity.setValue(TestDataAddresses[0].City);
    component.controlProvince.setValue(TestDataAddresses[0].Province!);
    component.controlCountry.setValue(TestDataAddresses[0].Country!.Id);

    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should send a call to the customer service when updating an existing customer', () => {
    component.queryStringCustomerId = TestDataCustomers[0].Id;
    component.queryStringShopId = TestDataCustomers[0].ShopId;
    component.controlShop.setValue(TestDataCustomers[0].ShopId);
    component.controlEmailAddress.setValue(TestDataCustomers[0].EmailAddress);
    component.controlUsername.setValue(TestDataCustomers[0].Username);
    component.controlGender.setValue(TestDataCustomers[0].Gender.toString());
    component.controlFirstName.setValue(TestDataCustomers[0].FirstName!);
    component.controlLastName.setValue(TestDataCustomers[0].LastName);
    component.controlAddressLine1.setValue(TestDataAddresses[0].AddressLine1);
    component.controlAddressLine2.setValue(TestDataAddresses[0].AddressLine2!);
    component.controlPostalCode.setValue(TestDataAddresses[0].PostalCode);
    component.controlCity.setValue(TestDataAddresses[0].City);
    component.controlProvince.setValue(TestDataAddresses[0].Province!);
    component.controlCountry.setValue(TestDataAddresses[0].Country!.Id);

    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should redirect when handling submit result and no errors are applicable', () => {
    const routerstub: Router = TestBed.inject(Router);
    spyOn(routerstub, 'navigate');

    const mutationResult = <MutationResult>{ Constraint: '', ErrorCode: 0, Identity: '', Message: '', Success: true };
    component.handleOnSubmitResult(mutationResult);
    expect(routerstub.navigate).toHaveBeenCalledWith(['/control-panel/customers']);
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

  it('should show a specific error when handling submit result and an error code with constraint \'UNIQUE_Customer_Username\' is applicable', () => {
    const mutationResult = <MutationResult>{ Constraint: 'UNIQUE_Customer_Username', ErrorCode: 666, Identity: '', Message: 'Evil error' };
    component.handleOnSubmitResult(mutationResult);
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });

  it('should show a specific error when handling submit result and an error code with constraint \'UNIQUE_Customer_EmailAddress\' is applicable', () => {
    const mutationResult = <MutationResult>{ Constraint: 'UNIQUE_Customer_EmailAddress', ErrorCode: 666, Identity: '', Message: 'Evil error' };
    component.handleOnSubmitResult(mutationResult);
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });

  it('should trigger error handling when sending a call to the customer service when creating a new customer and the request fails', () => {
    customerServiceSpy.create.and.returnValue(throwError(() => new Error('ERROR')));

    component.queryStringCustomerId = '';
    component.queryStringShopId = TestDataCustomers[0].ShopId;
    component.controlShop.setValue(TestDataCustomers[0].ShopId);
    component.controlEmailAddress.setValue(TestDataCustomers[0].EmailAddress);
    component.controlUsername.setValue(TestDataCustomers[0].Username);
    component.controlGender.setValue(TestDataCustomers[0].Gender.toString());
    component.controlFirstName.setValue(TestDataCustomers[0].FirstName!);
    component.controlLastName.setValue(TestDataCustomers[0].LastName);
    component.controlAddressLine1.setValue(TestDataAddresses[0].AddressLine1);
    component.controlAddressLine2.setValue(TestDataAddresses[0].AddressLine2!);
    component.controlPostalCode.setValue(TestDataAddresses[0].PostalCode);
    component.controlCity.setValue(TestDataAddresses[0].City);
    component.controlProvince.setValue(TestDataAddresses[0].Province!);
    component.controlCountry.setValue(TestDataCountries[0].Id);

    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should trigger error handling when sending a call to the customer service when updating an customer shop and the request fails', () => {
    customerServiceSpy.update.and.returnValue(throwError(() => new Error('ERROR')));

    component.queryStringCustomerId = TestDataCustomers[0].Id;
    component.queryStringShopId = TestDataCustomers[0].ShopId;
    component.controlShop.setValue(TestDataCustomers[0].ShopId);
    component.controlEmailAddress.setValue(TestDataCustomers[0].EmailAddress);
    component.controlUsername.setValue(TestDataCustomers[0].Username);
    component.controlGender.setValue(TestDataCustomers[0].Gender.toString());
    component.controlFirstName.setValue(TestDataCustomers[0].FirstName!);
    component.controlLastName.setValue(TestDataCustomers[0].LastName);
    component.controlAddressLine1.setValue(TestDataAddresses[0].AddressLine1);
    component.controlAddressLine2.setValue(TestDataAddresses[0].AddressLine2!);
    component.controlPostalCode.setValue(TestDataAddresses[0].PostalCode);
    component.controlCity.setValue(TestDataAddresses[0].City);
    component.controlProvince.setValue(TestDataAddresses[0].Province!);
    component.controlCountry.setValue(TestDataCountries[0].Id);

    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });
});