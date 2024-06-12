import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { MerchantService } from 'src/app/shared/services/merchant.service';
import { TestDataMerchants } from 'src/assets/test-data/Merchants';
import { PublicWebsiteMessageComponent } from '../message/message.component';
import { PublicWebsiteAccountActivateComponent } from './account-activate.component';

describe('PublicWebsiteAccountActivateComponent', () => {
  let component: PublicWebsiteAccountActivateComponent;
  let fixture: ComponentFixture<PublicWebsiteAccountActivateComponent>;

  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let merchantServiceSpy: jasmine.SpyObj<MerchantService>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    merchantServiceSpy = jasmine.createSpyObj('MerchantService', ['getByIdAndPassword', 'activateAccount']);
    merchantServiceSpy.getByIdAndPassword.and.returnValue(of(TestDataMerchants[0]));
    merchantServiceSpy.activateAccount.and.returnValue(of(mutationResult));

    TestBed.configureTestingModule({
      declarations: [PublicWebsiteAccountActivateComponent],
      imports: [BrowserAnimationsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterTestingModule.withRoutes(
        [
          { path: 'message/account-activated', component: PublicWebsiteMessageComponent },
          { path: 'message/account-already-activated', component: PublicWebsiteMessageComponent }
        ]
      )],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ merchantId: TestDataMerchants[0].Id, merchantPassword: 'PASSWORD' }) } } },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        { provide: MerchantService, useValue: merchantServiceSpy },
      ]
    });
    fixture = TestBed.createComponent(PublicWebsiteAccountActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should retrieve data when querystring parameters were supplied', () => {
    component.ngOnInit();
    expect(merchantServiceSpy.getByIdAndPassword).toHaveBeenCalled();
  });

  it('should set component merchant on data retrieval', () => {
    component.onRetrieveData(TestDataMerchants[0]);
    expect(component.merchant).toBeInstanceOf(Object);
  });

  it('should not proceed submitting when required form values are not filled in', () => {
    component.controlPassword.setValue('');
    component.onSubmit();
    expect(component.formSubmitted).toBeTrue();
    expect(component.formLoading).toBeFalse();
  });

  it('should send a call to the merchant service when activating account', () => {
    component.controlPassword.setValue(TestDataMerchants[0].Password!);
    component.controlPasswordRepetition.setValue(TestDataMerchants[0].Password!);
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should display an error message when the 2 supplied passwords are not identical', () => {
    component.controlPassword.setValue('PASSWORD');
    component.controlPasswordRepetition.setValue('ANOTHER PASSWORD');
    component.onSubmit();
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });

  it('should activate account when the 2 identical passwords were supplied', () => {
    component.controlPassword.setValue('PASSWORD');
    component.controlPasswordRepetition.setValue('PASSWORD');
    component.onSubmit();
    expect(merchantServiceSpy.activateAccount).toHaveBeenCalled();
  });

  it('should redirect when handling submit result and no errors are applicable', () => {
    const routerstub: Router = TestBed.inject(Router);
    spyOn(routerstub, 'navigate');

    const mutationResult = <MutationResult>{ Constraint: '', ErrorCode: 0, Identity: '', Message: '', Success: true };
    component.handleOnSubmitResult(mutationResult);
    expect(routerstub.navigate).toHaveBeenCalledWith(['/message/account-activated']);
  });

  it('should redirect when retrieving merchant data when merchant is already activated', () => {
    const routerstub: Router = TestBed.inject(Router);
    spyOn(routerstub, 'navigate');

    const activatedMerchant = Object.assign({}, TestDataMerchants[0]);
    activatedMerchant.Activated = new Date();
    component.onRetrieveData(activatedMerchant)
    expect(routerstub.navigate).toHaveBeenCalledWith(['/message/account-already-activated']);
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

  it('should trigger error handling when sending a call to the merchant service to activate the account and the request fails', () => {
    merchantServiceSpy.getByIdAndPassword.and.returnValue(throwError(() => new Error('ERROR')));
    merchantServiceSpy.activateAccount.and.returnValue(throwError(() => new Error('ERROR')));

    component.ngOnInit();
    component.controlPassword.setValue('PASSWORD');
    component.controlPasswordRepetition.setValue('PASSWORD');
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });
});