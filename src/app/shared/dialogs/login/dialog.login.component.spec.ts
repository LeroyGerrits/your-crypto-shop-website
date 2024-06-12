import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AccountComponent } from 'src/app/account/account.component';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogForgotPasswordComponent } from '../forgot-password/dialog.forgot-password.component';
import { DialogLoginComponent } from './dialog.login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MerchantService } from '../../services/merchant.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('DialogLoginComponent', () => {
  let component: DialogLoginComponent;
  let fixture: ComponentFixture<DialogLoginComponent>;

  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let matDialogRefSpy: any;
  let matDialogSpy: jasmine.SpyObj<MatDialog>
  let authenticationServiceSpy: jasmine.SpyObj<AuthenticationService>;

  beforeEach(() => {
    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogRefSpy.componentInstance = { title: '', message: '' };
    matDialogRefSpy.afterClosed = () => of(true);
    matDialogRefSpy.close = () => of(true);

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogSpy.open.and.returnValue(matDialogRefSpy);

    authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['login']);
    authenticationServiceSpy.login.and.returnValue(of(() => { }));

    TestBed.configureTestingModule({
    declarations: [DialogLoginComponent],
    imports: [BrowserAnimationsModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterTestingModule.withRoutes([{ path: 'control-panel', component: AccountComponent }])],
    providers: [
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: AuthenticationService, useValue: authenticationServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        MerchantService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    fixture = TestBed.createComponent(DialogLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show a forgot password dialog', () => {
    component.forgotPassword();
    expect(matDialogSpy.open).toHaveBeenCalled();
  });

  it('should not authenticate nothing when empty credentials get supplied', () => {
    component.controlEmailAddress.setValue('');
    component.controlPassword.setValue('');
    component.onSubmit();
    expect(authenticationServiceSpy.login).toHaveBeenCalledTimes(0);
  });

  it('should authenticate when a username and password are entered', () => {
    component.controlEmailAddress.setValue('merchant@yourcrypto.shop');
    component.controlPassword.setValue('********');
    component.onSubmit();
    expect(authenticationServiceSpy.login).toHaveBeenCalled();
  });

  it('should trigger error handling when sending a call to the authentication service and the request fails', () => {
    authenticationServiceSpy.login.and.returnValue(throwError(() => new Error('ERROR')));

    component.controlEmailAddress.setValue('merchant@yourcrypto.shop');
    component.controlPassword.setValue('********');
    component.onSubmit();
    expect(authenticationServiceSpy.login).toHaveBeenCalled();
  });
});