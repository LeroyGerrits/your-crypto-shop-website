import { ActivatedRoute, Router, RouterLink, convertToParamMap } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlPanelConfigurationDigiByteWalletComponent } from './digibyte-wallet.component';
import { ControlPanelConfigurationDigiByteWalletListComponent } from './digibyte-wallet-list.component';
import { DigiByteWalletService } from 'src/app/shared/services/DigiByteWallet.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TestDataDigiByteWallets } from 'src/assets/test-data/DigiByteWallets';
import { MatDividerModule } from '@angular/material/divider';

describe('ControlPanelConfigurationDigiByteWalletComponent', () => {
  let component: ControlPanelConfigurationDigiByteWalletComponent;
  let fixture: ComponentFixture<ControlPanelConfigurationDigiByteWalletComponent>;

  let digiByteWalletServiceSpy: jasmine.SpyObj<DigiByteWalletService>;
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    digiByteWalletServiceSpy = jasmine.createSpyObj('DigiByteWalletService', ['getById', 'create', 'update']);
    digiByteWalletServiceSpy.getById.and.returnValue(of(TestDataDigiByteWallets[0]));
    digiByteWalletServiceSpy.create.and.returnValue(of(mutationResult));
    digiByteWalletServiceSpy.update.and.returnValue(of(mutationResult));
    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [ControlPanelConfigurationDigiByteWalletComponent],
      imports: [BrowserAnimationsModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterLink, RouterTestingModule.withRoutes(
        [{ path: 'control-panel/configuration/digibyte-wallets', component: ControlPanelConfigurationDigiByteWalletListComponent }]
      )],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ digiByteWalletId: TestDataDigiByteWallets[0].Id }) } } },
        { provide: DigiByteWalletService, useValue: digiByteWalletServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        HttpClient,
        HttpHandler
      ]
    });
    fixture = TestBed.createComponent(ControlPanelConfigurationDigiByteWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set page title on data retrieval', () => {
    component.onRetrieveData(TestDataDigiByteWallets[0]);
    expect(component.pageTitle).toBe(TestDataDigiByteWallets[0].Name);
  });

  it('should not proceed submitting when required form values are not filled in', () => {
    component.controlName.setValue('');
    component.onSubmit();
    expect(component.formSubmitted).toBeTrue();
    expect(component.formLoading).toBeFalse();
  });

  it('should send a call to the DigiByte wallet service when creating a new DigiByte wallet', () => {
    component.queryStringDigiByteWalletId = '';
    component.controlName.setValue(TestDataDigiByteWallets[0].Name);
    component.controlAddress.setValue(TestDataDigiByteWallets[0].Address);
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should send a call to the DigiByte wallet service when updating an existing DigiByte wallet', () => {
    component.queryStringDigiByteWalletId = TestDataDigiByteWallets[0].Id;
    component.controlName.setValue(TestDataDigiByteWallets[0].Name);
    component.controlAddress.setValue(TestDataDigiByteWallets[0].Address);
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should redirect when handling submit result and no errors are applicable', () => {
    const routerstub: Router = TestBed.inject(Router);
    spyOn(routerstub, 'navigate');

    const mutationResult = <MutationResult>{ Constraint: '', ErrorCode: 0, Identity: '', Message: '', Success: true };
    component.handleOnSubmitResult(mutationResult);
    expect(routerstub.navigate).toHaveBeenCalledWith(['/control-panel/configuration/digibyte-wallets']);
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

  it('should show a specific error when handling submit result and an error code with constraint \'UNIQUE_DigiByteWallet_Name\' is applicable', () => {
    const mutationResult = <MutationResult>{ Constraint: 'UNIQUE_DigiByteWallet_Name', ErrorCode: 666, Identity: '', Message: 'Evil error' };
    component.handleOnSubmitResult(mutationResult);
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });

  it('should show a specific error when handling submit result and an error code with constraint \'UNIQUE_DigiByteWallet_Address\' is applicable', () => {
    const mutationResult = <MutationResult>{ Constraint: 'UNIQUE_DigiByteWallet_Address', ErrorCode: 666, Identity: '', Message: 'Evil error' };
    component.handleOnSubmitResult(mutationResult);
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });

  it('should trigger error handling when sending a call to the DigiByte wallet service when creating a new DigiByte wallet and the request fails', () => {
    digiByteWalletServiceSpy.create.and.returnValue(throwError(() => new Error('ERROR')));

    component.queryStringDigiByteWalletId = '';
    component.controlName.setValue(TestDataDigiByteWallets[0].Name);
    component.controlAddress.setValue(TestDataDigiByteWallets[0].Address);
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should trigger error handling when sending a call to the DigiByte wallet service when updating an existing DigiByte wallet and the request fails', () => {
    digiByteWalletServiceSpy.update.and.returnValue(throwError(() => new Error('ERROR')));

    component.queryStringDigiByteWalletId = TestDataDigiByteWallets[0].Id;
    component.controlName.setValue(TestDataDigiByteWallets[0].Name);
    component.controlAddress.setValue(TestDataDigiByteWallets[0].Address);
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });
});