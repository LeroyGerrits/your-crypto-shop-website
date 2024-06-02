import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';

import { AccountComponent } from 'src/app/account/account.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogForgotPasswordComponent } from './dialog.forgot-password.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MerchantService } from 'src/app/shared/services/-merchant.service';
import { PublicWebsiteMessageComponent } from 'src/app/public-website/message/message.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('DialogForgotPasswordComponent', () => {
  let component: DialogForgotPasswordComponent;
  let fixture: ComponentFixture<DialogForgotPasswordComponent>;

  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let matDialogRefSpy: any;
  let matDialogSpy: jasmine.SpyObj<MatDialog>
  let merchantServiceSpy: jasmine.SpyObj<MerchantService>;

  beforeEach(() => {
    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogRefSpy.componentInstance = { title: '', message: '' };
    matDialogRefSpy.afterClosed = () => of(true);
    matDialogRefSpy.close = () => of(true);

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogSpy.open.and.returnValue(matDialogRefSpy);

    merchantServiceSpy = jasmine.createSpyObj('MerchantService', ['forgotPassword']);
    merchantServiceSpy.forgotPassword.and.returnValue(of(true));

    TestBed.configureTestingModule({
      declarations: [DialogForgotPasswordComponent],
      imports: [BrowserAnimationsModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterTestingModule.withRoutes(
        [{ path: 'message/password-reset-link-sent', component: PublicWebsiteMessageComponent }]
      )],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: MerchantService, useValue: merchantServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy }
      ]
    });
    fixture = TestBed.createComponent(DialogForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not authenticate nothing when empty credentials get supplied', () => {
    component.controlEmailAddress.setValue('');
    component.onSubmit();
    expect(merchantServiceSpy.forgotPassword).toHaveBeenCalledTimes(0);
  });

  it('should authenticate when a username and password are entered', () => {
    component.controlEmailAddress.setValue('merchant@yourcrypto.shop');
    component.onSubmit();
    expect(merchantServiceSpy.forgotPassword).toHaveBeenCalled();
  });

  it('should trigger error handling when sending a call to the merchant service and the request fails', () => {
    merchantServiceSpy.forgotPassword.and.returnValue(throwError(() => new Error('ERROR')));

    component.controlEmailAddress.setValue('merchant@yourcrypto.shop');
    component.onSubmit();
    expect(merchantServiceSpy.forgotPassword).toHaveBeenCalled();
  });
});