import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterLink, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';

import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { DeliveryMethodService } from 'src/app/shared/services/delivery-method.service';
import { ShopService } from 'src/app/shared/services/-shop.service';
import { TestDataDeliveryMethods } from 'src/assets/test-data/DeliveryMethods';
import { TestDataShops } from 'src/assets/test-data/Shops';
import { ControlPanelConfigurationDeliveryMethodListComponent } from './delivery-method-list.component';
import { ControlPanelConfigurationDeliveryMethodComponent } from './delivery-method.component';
import { MutateDeliveryMethodRequest } from 'src/app/shared/models/request/MutateDeliveryMethodRequest.model';
import { CountryService } from 'src/app/shared/services/-country.service';
import { TestDataCountries } from 'src/assets/test-data/Countries';
import { MatTabsModule } from '@angular/material/tabs';

describe('ControlPanelConfigurationDeliveryMethodComponent', () => {
  let component: ControlPanelConfigurationDeliveryMethodComponent;
  let fixture: ComponentFixture<ControlPanelConfigurationDeliveryMethodComponent>;

  let countryServiceSpy: jasmine.SpyObj<CountryService>;
  let deliveryMethodServiceSpy: jasmine.SpyObj<DeliveryMethodService>;
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let shopServiceSpy: jasmine.SpyObj<ShopService>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  const mutateDeliveryMethodRequest: MutateDeliveryMethodRequest = {
    DeliveryMethod: TestDataDeliveryMethods[0],
    CostsPerCountry: {}
  };

  beforeEach(() => {
    countryServiceSpy = jasmine.createSpyObj('CountryService', ['getList']);
    countryServiceSpy.getList.and.returnValue(of(TestDataCountries));

    deliveryMethodServiceSpy = jasmine.createSpyObj('DeliveryMethodService', ['getById', 'create', 'update']);
    deliveryMethodServiceSpy.getById.and.returnValue(of(mutateDeliveryMethodRequest));
    deliveryMethodServiceSpy.create.and.returnValue(of(mutationResult));
    deliveryMethodServiceSpy.update.and.returnValue(of(mutationResult));

    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    shopServiceSpy = jasmine.createSpyObj('ShopService', ['getList']);
    shopServiceSpy.getList.and.returnValue(of(TestDataShops));

    TestBed.configureTestingModule({
      declarations: [ControlPanelConfigurationDeliveryMethodComponent],
      imports: [BrowserAnimationsModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTabsModule, ReactiveFormsModule, RouterLink, RouterTestingModule.withRoutes(
        [{ path: 'control-panel/configuration/delivery-methods', component: ControlPanelConfigurationDeliveryMethodListComponent }]
      )],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ deliveryMethodId: TestDataDeliveryMethods[0].Id }) } } },
        { provide: CountryService, useValue: countryServiceSpy },
        { provide: DeliveryMethodService, useValue: deliveryMethodServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        { provide: ShopService, useValue: shopServiceSpy },
        Router
      ]
    });
    fixture = TestBed.createComponent(ControlPanelConfigurationDeliveryMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set page title on data retrieval', () => {
    component.onRetrieveDeliveryMethodData(mutateDeliveryMethodRequest);
    expect(component.pageTitle).toBe(TestDataDeliveryMethods[0].Name);
  });

  it('should not proceed submitting when required form values are not filled in', () => {
    component.controlName.setValue('');
    component.onSubmit();
    expect(component.formSubmitted).toBeTrue();
    expect(component.formLoading).toBeFalse();
  });

  it('should send a call to the delivery method service when creating a new delivery method', () => {
    component.queryStringDeliveryMethodId = '';
    component.controlName.setValue(TestDataDeliveryMethods[0].Name);
    component.controlShop.setValue(TestDataShops[0].Id);
    component.controlCosts.setValue(TestDataDeliveryMethods[0].Costs!.toString());
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should send a call to the delivery method service when updating an existing delivery method', () => {
    component.queryStringDeliveryMethodId = TestDataDeliveryMethods[0].Id;
    component.controlName.setValue(TestDataDeliveryMethods[0].Name);
    component.controlShop.setValue(TestDataShops[0].Id);
    component.controlCosts.setValue(TestDataDeliveryMethods[0].Costs!.toString());
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should redirect when handling submit result and no errors are applicable', () => {
    const routerstub: Router = TestBed.inject(Router);
    spyOn(routerstub, 'navigate');

    const mutationResult = <MutationResult>{ Constraint: '', ErrorCode: 0, Identity: '', Message: '', Success: true };
    component.handleOnSubmitResult(mutationResult);
    expect(routerstub.navigate).toHaveBeenCalledWith(['/control-panel/configuration/delivery-methods']);
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

  it('should show a specific error when handling submit result and an error code with constraint \'UNIQUE_DeliveryMethod_Name\' is applicable', () => {
    const mutationResult = {
      Constraint: 'UNIQUE_DeliveryMethod_Name',
      ErrorCode: 666,
      Identity: '',
      Message: 'Evil error',
      Success: false
    };
    component.handleOnSubmitResult(mutationResult);
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });

  it('should trigger error handling when sending a call to the delivery method service when creating a new delivery method and the request fails', () => {
    deliveryMethodServiceSpy.create.and.returnValue(throwError(() => new Error('ERROR')));

    component.queryStringDeliveryMethodId = '';
    component.controlName.setValue(TestDataDeliveryMethods[0].Name);
    component.controlCosts.setValue(TestDataDeliveryMethods[0].Costs!.toString());
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should trigger error handling when sending a call to the delivery method service when updating an delivery method and the request fails', () => {
    deliveryMethodServiceSpy.update.and.returnValue(throwError(() => new Error('ERROR')));

    component.queryStringDeliveryMethodId = TestDataShops[0].Id;
    component.controlName.setValue(TestDataDeliveryMethods[0].Name);
    component.controlCosts.setValue(TestDataDeliveryMethods[0].Costs!.toString());
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });
});