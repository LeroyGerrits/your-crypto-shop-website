import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';

import { AccountComponent } from 'src/app/account/account.component';
import { AuthenticationService } from 'src/app/shared/services/Authentication.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogLoginComponent } from './dialog.login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('DialogLoginComponent', () => {
  let component: DialogLoginComponent;
  let fixture: ComponentFixture<DialogLoginComponent>;

  let matDialogRefSpy: any;
  let matDialogSpy: jasmine.SpyObj<MatDialog>
  let authenticationServiceSpy: jasmine.SpyObj<AuthenticationService>;

  beforeEach(() => {
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
      imports: [BrowserAnimationsModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterTestingModule.withRoutes(
        [{ path: 'account', component: AccountComponent }]
      )],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: AuthenticationService, useValue: authenticationServiceSpy },
        HttpClient,
        HttpHandler
      ]
    });
    fixture = TestBed.createComponent(DialogLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not authenticate nothing when empty credentials get supplied', () => {
    component.controlUsername.setValue('');
    component.controlPassword.setValue('');
    component.onSubmit();
    expect(authenticationServiceSpy.login).toHaveBeenCalledTimes(0);
  });

  it('should authenticate when a username and password are entered', () => {
    component.controlUsername.setValue('merchant@dgbcommerce.com');
    component.controlPassword.setValue('********');
    component.onSubmit();
    expect(authenticationServiceSpy.login).toHaveBeenCalled();
  });
});

describe('DialogLoginComponentWithErrors', () => {
  let component: DialogLoginComponent;
  let fixture: ComponentFixture<DialogLoginComponent>;

  let matDialogRefSpy: any;
  let matDialogSpy: jasmine.SpyObj<MatDialog>
  let authenticationServiceSpy: jasmine.SpyObj<AuthenticationService>;

  beforeEach(() => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogRefSpy.componentInstance = { title: '', message: '' };
    matDialogRefSpy.afterClosed = () => of(true);
    matDialogRefSpy.close = () => of(true);

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogSpy.open.and.returnValue(matDialogRefSpy);

    authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['login']);
    authenticationServiceSpy.login.and.returnValue(throwError(() => new Error('ERROR')));

    TestBed.configureTestingModule({
      declarations: [DialogLoginComponent],
      imports: [BrowserAnimationsModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterTestingModule.withRoutes(
        [{ path: 'account', component: AccountComponent }]
      )],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: AuthenticationService, useValue: authenticationServiceSpy },
        HttpClient,
        HttpHandler
      ]
    });
    fixture = TestBed.createComponent(DialogLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should trigger error handling when sending a call to the authentication service and the request fails', () => {
    component.controlUsername.setValue('merchant@dgbcommerce.com');
    component.controlPassword.setValue('********');
    component.onSubmit();
    expect(authenticationServiceSpy.login).toHaveBeenCalled();
  });
});