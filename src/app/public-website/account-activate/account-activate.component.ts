import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { Merchant } from 'src/app/shared/models/Merchant.model';
import { MerchantService } from 'src/app/shared/services/Merchant.service';
import { MutationResult } from 'src/app/shared/models/MutationResult';

@Component({
  selector: 'public-website-account-activate',
  templateUrl: './account-activate.component.html'
})

export class PublicWebsiteAccountActivateComponent implements OnInit {
  public merchant: Merchant = new Merchant();

  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;
  public queryStringMerchantId: string | null = '';
  public queryStringMerchantPassword: string | null = '';

  public form!: FormGroup;
  public formLoading = false;
  public formSubmitted = false;

  public controlPassword = new FormControl('', Validators.required);
  public controlPasswordRepetition = new FormControl('', Validators.required);

  public showForm = false;

  constructor(
    private merchantService: MerchantService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = new FormGroup([
      this.controlPassword,
      this.controlPasswordRepetition
    ]);
  }

  ngOnInit() {
    this.queryStringMerchantId = this.route.snapshot.paramMap.get('merchantId');
    this.queryStringMerchantPassword = this.route.snapshot.paramMap.get('merchantPassword');

    if (this.queryStringMerchantId && this.queryStringMerchantPassword) {
      this.merchantService.getByIdAndPassword(this.queryStringMerchantId, this.queryStringMerchantPassword).subscribe({
        next: result => this.onRetrieveData(result),
        error: error => this.router.navigate(['/message/account-already-activated'])
      });
    }
  }

  onRetrieveData(merchant: Merchant) {
    if (merchant.Activated)
      this.router.navigate(['/message/account-already-activated']);

    this.merchant = merchant;
    this.showForm = true;
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    if (this.controlPassword.value != this.controlPasswordRepetition.value) {
      this.snackBarRef = this.snackBar.open('Your 2 passwords are not identical.', 'Close', { panelClass: ['error-snackbar'] });
      return;
    }

    this.formLoading = true;

    this.merchantService.activateAccount(this.queryStringMerchantId!, this.queryStringMerchantPassword!, this.controlPassword.value!).subscribe({
      next: result => this.handleOnSubmitResult(result),
      error: error => this.handleOnSubmitError(error),
      complete: () => this.formLoading = false
    });
  }

  handleOnSubmitResult(result: MutationResult) {
    if (result.Success) {
      this.router.navigate(['/message/account-activated']);
    } else {
      this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
    }
  }

  handleOnSubmitError(error: string) {
    this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
    this.formLoading = false;
  }
}
