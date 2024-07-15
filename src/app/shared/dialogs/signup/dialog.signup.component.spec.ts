import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { PublicWebsiteMessageComponent } from 'src/app/public-website/message/message.component';
import { MutationResult } from '../../models/mutation-result.model';
import { MerchantService } from '../../services/merchant.service';
import { DialogSignUpComponent } from './dialog.signup.component';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('DialogSignUpComponent', () => {
  let component: DialogSignUpComponent;
  let fixture: ComponentFixture<DialogSignUpComponent>;

  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let matDialogRefSpy: any;
  let matDialogSpy: jasmine.SpyObj<MatDialog>
  let merchantServiceSpy: jasmine.SpyObj<MerchantService>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogRefSpy.componentInstance = { title: '', message: '' };
    matDialogRefSpy.afterClosed = () => of(true);
    matDialogRefSpy.close = () => of(true);

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogSpy.open.and.returnValue(matDialogRefSpy);

    merchantServiceSpy = jasmine.createSpyObj('MerchantService', ['create']);
    merchantServiceSpy.create.and.returnValue(of(mutationResult));

    TestBed.configureTestingModule({
      declarations: [DialogSignUpComponent],
      imports: [BrowserAnimationsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatRadioModule, ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        { provide: MerchantService, useValue: merchantServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(DialogSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not create a new account when empty fields get supplied', () => {
    component.controlEmailAddress.setValue('');
    component.controlUsername.setValue('');
    component.controlLastName.setValue('');
    component.controlGender.setValue('');
    component.onSubmit();
    expect(merchantServiceSpy.create).toHaveBeenCalledTimes(0);
  });

  it('should create a new account when all the required fields are supplied', () => {
    component.controlEmailAddress.setValue('merchant@yourcrypto.shop');
    component.controlUsername.setValue('Your Crypto Shop');
    component.controlLastName.setValue('Doe');
    component.controlGender.setValue('0');
    component.onSubmit();
    expect(merchantServiceSpy.create).toHaveBeenCalled();
  });

  it('should navigate when handling submit result and no error code is applicable', () => {
    const mutationResult = <MutationResult>{ Constraint: '', ErrorCode: 0, Identity: '', Message: '', Success: true };
    const routerstub: Router = TestBed.inject(Router);
    spyOn(routerstub, 'navigate');

    component.handleOnSubmitResult(mutationResult);
    expect(routerstub.navigate).toHaveBeenCalledWith(['/message/account-registered']);
  });

  it('should show an error when handling submit result and an error code is applicable', () => {
    const mutationResult = <MutationResult>{ ErrorCode: 666, Identity: '', Message: 'Evil error' };
    component.handleOnSubmitResult(mutationResult);
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });

  it('should show a specific error when handling submit result and an error code with constraint \'UNIQUE_Merchant_EmailAddress\' is applicable', () => {
    const mutationResult = { Constraint: 'UNIQUE_Merchant_EmailAddress', ErrorCode: 666, Identity: '', Message: 'Evil error', Success: false };
    component.handleOnSubmitResult(mutationResult);
    expect(component).toBeTruthy();
  });

  it('should show a specific error when handling submit result and an error code with constraint \'UNIQUE_Merchant_Username\' is applicable', () => {
    const mutationResult = { Constraint: 'UNIQUE_Merchant_Username', ErrorCode: 666, Identity: '', Message: 'Evil error', Success: false };
    component.handleOnSubmitResult(mutationResult);
    expect(component).toBeTruthy();
  });

  it('should trigger error handling when sending a call to the merchant service and the request fails', () => {
    merchantServiceSpy.create.and.returnValue(throwError(() => new Error('ERROR')));

    component.controlEmailAddress.setValue('merchant@yourcrypto.shop');
    component.controlUsername.setValue('Your Crypto Shop');
    component.controlLastName.setValue('Doe');
    component.controlGender.setValue('0');
    component.onSubmit();
    expect(merchantServiceSpy.create).toHaveBeenCalled();
  });
});