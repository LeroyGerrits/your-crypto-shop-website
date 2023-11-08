import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});