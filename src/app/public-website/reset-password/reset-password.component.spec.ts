import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { MerchantPasswordResetLinkService } from 'src/app/shared/services/merchant-password-reset-link.service';
import { TestDataMerchantPasswordResetLinks } from 'src/assets/test-data/merchant-password-reset-links';
import { PublicWebsiteResetPasswordComponent } from './reset-password.component';

describe('PublicWebsiteResetPasswordComponent', () => {
  let component: PublicWebsiteResetPasswordComponent;
  let fixture: ComponentFixture<PublicWebsiteResetPasswordComponent>;

  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let merchantPasswordResetLinkServiceSpy: jasmine.SpyObj<MerchantPasswordResetLinkService>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    merchantPasswordResetLinkServiceSpy = jasmine.createSpyObj('MerchantService', ['getByIdAndKey', 'resetPassword']);
    merchantPasswordResetLinkServiceSpy.getByIdAndKey.and.returnValue(of(TestDataMerchantPasswordResetLinks[0]));
    merchantPasswordResetLinkServiceSpy.resetPassword.and.returnValue(of(mutationResult));

    TestBed.configureTestingModule({
      declarations: [PublicWebsiteResetPasswordComponent],
      imports: [BrowserAnimationsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ id: TestDataMerchantPasswordResetLinks[0].Id, key: TestDataMerchantPasswordResetLinks[0].Key }) } } },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        { provide: MerchantPasswordResetLinkService, useValue: merchantPasswordResetLinkServiceSpy },
      ]
    });
    fixture = TestBed.createComponent(PublicWebsiteResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should retrieve data when querystring parameters were supplied', () => {
    component.ngOnInit();
    expect(merchantPasswordResetLinkServiceSpy.getByIdAndKey).toHaveBeenCalled();
  });

  it('should set component merchant on data retrieval', () => {
    component.onRetrieveData(TestDataMerchantPasswordResetLinks[0]);
    expect(component.merchantPasswordResetLink).toBeInstanceOf(Object);
  });

  it('should not proceed submitting when required form values are not filled in', () => {
    component.controlPassword.setValue('');
    component.onSubmit();
    expect(component.formSubmitted).toBeTrue();
    expect(component.formLoading).toBeFalse();
  });

  it('should send a call to the merchant service when activating account', () => {
    component.controlPassword.setValue('PASSWORD');
    component.controlPasswordRepetition.setValue('PASSWORD');
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
    expect(merchantPasswordResetLinkServiceSpy.resetPassword).toHaveBeenCalled();
  });

  it('should redirect when handling submit result and no errors are applicable', () => {
    const routerstub: Router = TestBed.inject(Router);
    spyOn(routerstub, 'navigate');

    const mutationResult = <MutationResult>{ Constraint: '', ErrorCode: 0, Identity: '', Message: '', Success: true };
    component.handleOnSubmitResult(mutationResult);
    expect(routerstub.navigate).toHaveBeenCalledWith(['/message/password-reset-finished']);
  });

  it('should redirect when retrieving merchant password reset link data when the link is already activated', () => {
    const routerstub: Router = TestBed.inject(Router);
    spyOn(routerstub, 'navigate');

    const activatedMerchantPasswordResetLink = Object.assign({}, TestDataMerchantPasswordResetLinks[0]);
    activatedMerchantPasswordResetLink.Used = new Date();
    component.onRetrieveData(activatedMerchantPasswordResetLink)
    expect(routerstub.navigate).toHaveBeenCalledWith(['/message/password-reset-link-already-used']);
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

  it('should trigger error handling when sending a call to the merchant password reset link service to reset the password and the request fails', () => {
    merchantPasswordResetLinkServiceSpy.getByIdAndKey.and.returnValue(throwError(() => new Error('ERROR')))
    merchantPasswordResetLinkServiceSpy.resetPassword.and.returnValue(throwError(() => new Error('ERROR')))

    component.ngOnInit();
    component.controlPassword.setValue('PASSWORD');
    component.controlPasswordRepetition.setValue('PASSWORD');
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });
});