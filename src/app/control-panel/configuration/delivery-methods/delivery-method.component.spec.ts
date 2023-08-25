import { ActivatedRoute, Router, RouterLink, convertToParamMap } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlPanelConfigurationDeliveryMethodComponent } from './delivery-method.component';
import { ControlPanelConfigurationDeliveryMethodListComponent } from './delivery-method-list.component';
import { DeliveryMethodService } from 'src/app/shared/services/DeliveryMethod.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ShopService } from 'src/app/shared/services/Shop.service';
import { TestDataDeliveryMethods } from 'src/assets/test-data/DeliveryMethods';
import { TestDataShops } from 'src/assets/test-data/Shops';
import { of } from 'rxjs';

describe('ControlPanelConfigurationDeliveryMethodComponent', () => {
  let component: ControlPanelConfigurationDeliveryMethodComponent;
  let fixture: ComponentFixture<ControlPanelConfigurationDeliveryMethodComponent>;

  let deliveryMethodServiceSpy: jasmine.SpyObj<DeliveryMethodService>;
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let shopServiceSpy: jasmine.SpyObj<ShopService>;
  let mutationResult: MutationResult = { ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    deliveryMethodServiceSpy = jasmine.createSpyObj('DeliveryMethodService', ['getById', 'create', 'update']);
    deliveryMethodServiceSpy.getById.and.returnValue(of(TestDataDeliveryMethods[0]));
    deliveryMethodServiceSpy.create.and.returnValue(of(mutationResult));
    deliveryMethodServiceSpy.update.and.returnValue(of(mutationResult));
    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    shopServiceSpy = jasmine.createSpyObj('ShopService', ['getList']);
    shopServiceSpy.getList.and.returnValue(of(TestDataShops));

    TestBed.configureTestingModule({
      declarations: [ControlPanelConfigurationDeliveryMethodComponent],
      imports: [BrowserAnimationsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, RouterLink, RouterTestingModule.withRoutes(
        [{ path: 'control-panel/configuration/delivery-methods', component: ControlPanelConfigurationDeliveryMethodListComponent }]
      )],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ deliveryMethodId: TestDataDeliveryMethods[0].Id }) } } },
        { provide: ShopService, useValue: shopServiceSpy },
        { provide: DeliveryMethodService, useVaue: deliveryMethodServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        HttpClient,
        HttpHandler,
        Router
      ]
    });    
    fixture = TestBed.createComponent(ControlPanelConfigurationDeliveryMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set page title on data retrieval', () => {
    component.onRetrieveData(TestDataDeliveryMethods[0]);
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

    const mutationResult = {
      Constraint: '',
      ErrorCode: 0,
      Identity: '',
      Message: ''
    };
    component.handleOnSubmitResult(mutationResult);
    expect(routerstub.navigate).toHaveBeenCalledWith(['/control-panel/configuration/delivery-methods']);
  });

  it('should show a message when an unhandled error occurs', () => {
    component.handleOnSubmitError('Unhandled error');
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });

  it('should show an error when handling submit result and an error code is applicable', () => {
    const mutationResult = {
      Constraint: '',
      ErrorCode: 666,
      Identity: '',
      Message: 'Evil error'
    };
    component.handleOnSubmitResult(mutationResult);
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });

  it('should show a specific error when handling submit result and an error code with constraint \'UNIQUE_DeliveryMethod_Name\' is applicable', () => {
    const mutationResult = {
      Constraint: 'UNIQUE_DeliveryMethod_Name',
      ErrorCode: 666,
      Identity: '',
      Message: 'Evil error'
    };
    component.handleOnSubmitResult(mutationResult);
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });
});