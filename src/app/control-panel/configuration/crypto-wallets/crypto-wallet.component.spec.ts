import { ActivatedRoute, Router, RouterLink, convertToParamMap } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlPanelConfigurationCryptoWalletComponent } from './crypto-wallet.component';
import { ControlPanelConfigurationCryptoWalletListComponent } from './crypto-wallet-list.component';
import { CryptoWalletService } from 'src/app/shared/services/crypto-wallet.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TestDataCryptoWallets } from 'src/assets/test-data/CryptoWallets';
import { MatDividerModule } from '@angular/material/divider';

describe('ControlPanelConfigurationCryptoWalletComponent', () => {
  let component: ControlPanelConfigurationCryptoWalletComponent;
  let fixture: ComponentFixture<ControlPanelConfigurationCryptoWalletComponent>;

  let cryptoWalletServiceSpy: jasmine.SpyObj<CryptoWalletService>;
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    cryptoWalletServiceSpy = jasmine.createSpyObj('CryptoWalletService', ['getById', 'create', 'update']);
    cryptoWalletServiceSpy.getById.and.returnValue(of(TestDataCryptoWallets[0]));
    cryptoWalletServiceSpy.create.and.returnValue(of(mutationResult));
    cryptoWalletServiceSpy.update.and.returnValue(of(mutationResult));
    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [ControlPanelConfigurationCryptoWalletComponent],
      imports: [BrowserAnimationsModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterLink, RouterTestingModule.withRoutes(
        [{ path: 'control-panel/configuration/crypto-wallets', component: ControlPanelConfigurationCryptoWalletListComponent }]
      )],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ cryptoWalletId: TestDataCryptoWallets[0].Id }) } } },
        { provide: CryptoWalletService, useValue: cryptoWalletServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        HttpClient,
        HttpHandler
      ]
    });
    fixture = TestBed.createComponent(ControlPanelConfigurationCryptoWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set page title on data retrieval', () => {
    component.onRetrieveData(TestDataCryptoWallets[0]);
    expect(component.pageTitle).toBe(TestDataCryptoWallets[0].Name);
  });

  it('should not proceed submitting when required form values are not filled in', () => {
    component.controlName.setValue('');
    component.onSubmit();
    expect(component.formSubmitted).toBeTrue();
    expect(component.formLoading).toBeFalse();
  });

  it('should send a call to the crypto wallet service when creating a new crypto wallet', () => {
    component.queryStringCryptoWalletId = '';
    component.controlName.setValue(TestDataCryptoWallets[0].Name);
    component.controlAddress.setValue(TestDataCryptoWallets[0].Address);
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should send a call to the crypto wallet service when updating an existing crypto wallet', () => {
    component.queryStringCryptoWalletId = TestDataCryptoWallets[0].Id;
    component.controlName.setValue(TestDataCryptoWallets[0].Name);
    component.controlAddress.setValue(TestDataCryptoWallets[0].Address);
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should redirect when handling submit result and no errors are applicable', () => {
    const routerstub: Router = TestBed.inject(Router);
    spyOn(routerstub, 'navigate');

    const mutationResult = <MutationResult>{ Constraint: '', ErrorCode: 0, Identity: '', Message: '', Success: true };
    component.handleOnSubmitResult(mutationResult);
    expect(routerstub.navigate).toHaveBeenCalledWith(['/control-panel/configuration/crypto-wallets']);
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

  it('should show a specific error when handling submit result and an error code with constraint \'UNIQUE_CryptoWallet_Name\' is applicable', () => {
    const mutationResult = <MutationResult>{ Constraint: 'UNIQUE_CryptoWallet_Name', ErrorCode: 666, Identity: '', Message: 'Evil error' };
    component.handleOnSubmitResult(mutationResult);
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });

  it('should show a specific error when handling submit result and an error code with constraint \'UNIQUE_CryptoWallet_Address\' is applicable', () => {
    const mutationResult = <MutationResult>{ Constraint: 'UNIQUE_CryptoWallet_Address', ErrorCode: 666, Identity: '', Message: 'Evil error' };
    component.handleOnSubmitResult(mutationResult);
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });

  it('should trigger error handling when sending a call to the crypto wallet service when creating a new crypto wallet and the request fails', () => {
    cryptoWalletServiceSpy.create.and.returnValue(throwError(() => new Error('ERROR')));

    component.queryStringCryptoWalletId = '';
    component.controlName.setValue(TestDataCryptoWallets[0].Name);
    component.controlAddress.setValue(TestDataCryptoWallets[0].Address);
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should trigger error handling when sending a call to the crypto wallet service when updating an existing crypto wallet and the request fails', () => {
    cryptoWalletServiceSpy.update.and.returnValue(throwError(() => new Error('ERROR')));

    component.queryStringCryptoWalletId = TestDataCryptoWallets[0].Id;
    component.controlName.setValue(TestDataCryptoWallets[0].Name);
    component.controlAddress.setValue(TestDataCryptoWallets[0].Address);
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });
});