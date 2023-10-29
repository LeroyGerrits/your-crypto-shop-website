import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogSignUpComponent } from './dialog.signup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MerchantService } from '../../services/Merchant.service';
import { MutationResult } from '../../models/MutationResult';
import { PublicWebsiteMessageComponent } from 'src/app/public-website/message/message.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('DialogSignUpComponent', () => {
  let component: DialogSignUpComponent;
  let fixture: ComponentFixture<DialogSignUpComponent>;

  let matDialogRefSpy: any;
  let matDialogSpy: jasmine.SpyObj<MatDialog>
  let merchantServiceSpy: jasmine.SpyObj<MerchantService>;
  let mutationResult: MutationResult = { ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
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
      imports: [BrowserAnimationsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatRadioModule, ReactiveFormsModule, RouterTestingModule.withRoutes(
        [{ path: 'message/account-registered', component: PublicWebsiteMessageComponent }]
      )],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: MerchantService, useValue: merchantServiceSpy },
        HttpClient,
        HttpHandler
      ]
    });
    fixture = TestBed.createComponent(DialogSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
    component.controlEmailAddress.setValue('merchant@dgbcommerce.com');
    component.controlUsername.setValue('DGB Commerce');
    component.controlLastName.setValue('Doe');
    component.controlGender.setValue('0');
    component.onSubmit();
    expect(merchantServiceSpy.create).toHaveBeenCalled();
  });

  it('should show an error when handling submit result and an error code is applicable', () => {
    const mutationResult = {
      ErrorCode: 666,
      Identity: '',
      Message: 'Evil error'
    };
    component.handleOnSubmitResult(mutationResult);
    expect(component.formError).toBe(mutationResult.Message);
  });
});

describe('DialogSignUpComponentWithErrors', () => {
  let component: DialogSignUpComponent;
  let fixture: ComponentFixture<DialogSignUpComponent>;

  let matDialogRefSpy: any;
  let matDialogSpy: jasmine.SpyObj<MatDialog>
  let merchantServiceSpy: jasmine.SpyObj<MerchantService>;

  beforeEach(() => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogRefSpy.componentInstance = { title: '', message: '' };
    matDialogRefSpy.afterClosed = () => of(true);
    matDialogRefSpy.close = () => of(true);

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogSpy.open.and.returnValue(matDialogRefSpy);

    merchantServiceSpy = jasmine.createSpyObj('MerchantService', ['create']);
    merchantServiceSpy.create.and.returnValue(throwError(() => new Error('ERROR')));

    TestBed.configureTestingModule({
      declarations: [DialogSignUpComponent],
      imports: [BrowserAnimationsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatRadioModule, ReactiveFormsModule, RouterTestingModule.withRoutes(
        [{ path: 'message/account-registered', component: PublicWebsiteMessageComponent }]
      )],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: MerchantService, useValue: merchantServiceSpy },
        HttpClient,
        HttpHandler
      ]
    });
    fixture = TestBed.createComponent(DialogSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should trigger error handling when sending a call to the merchant service and the request fails', () => {
    component.controlEmailAddress.setValue('merchant@dgbcommerce.com');
    component.controlUsername.setValue('DGB Commerce');
    component.controlLastName.setValue('Doe');
    component.controlGender.setValue('0');
    component.onSubmit();
    expect(merchantServiceSpy.create).toHaveBeenCalled();
  });
});
