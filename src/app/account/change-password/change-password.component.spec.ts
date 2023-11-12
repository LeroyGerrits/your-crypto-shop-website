import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { MerchantService } from 'src/app/shared/services/Merchant.service';
import { AccountChangePasswordComponent } from './change-password.component';

describe('AccountChangePasswordComponent', () => {
  let component: AccountChangePasswordComponent;
  let fixture: ComponentFixture<AccountChangePasswordComponent>;

  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let merchantServiceSpy: jasmine.SpyObj<MerchantService>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(() => {
    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    merchantServiceSpy = jasmine.createSpyObj('MerchantService', ['getByIdAndPassword', 'changePassword']);
    merchantServiceSpy.changePassword.and.returnValue(of(mutationResult));

    TestBed.configureTestingModule({
      declarations: [AccountChangePasswordComponent],
      imports: [BrowserAnimationsModule, HttpClientTestingModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterLink],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        { provide: MerchantService, useValue: merchantServiceSpy },
      ]
    });
    fixture = TestBed.createComponent(AccountChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not proceed submitting when required form values are not filled in', () => {
    component.controlCurrentPassword.setValue('');
    component.onSubmit();
    expect(component.formSubmitted).toBeTrue();
    expect(component.formLoading).toBeFalse();
  });

  it('should send a call to the merchant service when changing password', () => {
    component.controlCurrentPassword.setValue('********');
    component.controlPassword.setValue('NEWPASSWORD');
    component.controlPasswordRepetition.setValue('NEWPASSWORD');
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should redirect when handling submit result and no errors are applicable', () => {
    const routerstub: Router = TestBed.inject(Router);
    spyOn(routerstub, 'navigate');

    const mutationResult = <MutationResult>{ Constraint: '', ErrorCode: 0, Identity: '', Message: '', Success: true };
    component.handleOnSubmitResult(mutationResult);
    expect(routerstub.navigate).toHaveBeenCalledWith(['/message/account-password-changed']);
  });

  it('should show a message when 2 mismatched new passwords were submitted', () => {
    component.controlCurrentPassword.setValue('********');
    component.controlPassword.setValue('NEWPASSWORD');
    component.controlPasswordRepetition.setValue('MISTYPEDPASSWORD');
    component.onSubmit();
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });

  it('should show a message when an unhandled error occurs', () => {
    component.handleOnSubmitError('Unhandled error');
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });
});

describe('AccountChangePasswordComponentWithErrors', () => {
  let component: AccountChangePasswordComponent;
  let fixture: ComponentFixture<AccountChangePasswordComponent>;

  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let merchantServiceSpy: jasmine.SpyObj<MerchantService>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(() => {
    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    merchantServiceSpy = jasmine.createSpyObj('MerchantService', ['getByIdAndPassword', 'changePassword']);
    merchantServiceSpy.changePassword.and.returnValue(throwError(() => new Error('ERROR')));

    TestBed.configureTestingModule({
      declarations: [AccountChangePasswordComponent],
      imports: [BrowserAnimationsModule, HttpClientTestingModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterLink],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        { provide: MerchantService, useValue: merchantServiceSpy },
      ]
    });
    fixture = TestBed.createComponent(AccountChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should trigger error handling when sending a call to the merchant service when changing password and the request fails', () => {
    component.controlCurrentPassword.setValue('********');
    component.controlPassword.setValue('NEWPASSWORD');
    component.controlPasswordRepetition.setValue('NEWPASSWORD');
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });
});