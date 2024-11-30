import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { MerchantPasswordResetLink } from 'src/app/shared/models/merchant-password-reset-link.model';
import { MerchantPasswordResetLinkService } from 'src/app/shared/services/merchant-password-reset-link.service';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';

@Component({
    selector: 'public-website-reset-password',
    templateUrl: './reset-password.component.html',
    standalone: false
})

export class PublicWebsiteResetPasswordComponent implements OnInit {
  public merchantPasswordResetLink: MerchantPasswordResetLink = new MerchantPasswordResetLink();

  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;
  public queryStringId: string | null = '';
  public queryStringKey: string | null = '';

  public form!: FormGroup;
  public formLoading = false;
  public formSubmitted = false;

  public controlPassword = new FormControl('', Validators.required);
  public controlPasswordRepetition = new FormControl('', Validators.required);

  public showForm = false;

  constructor(
    private merchantPasswordResetLinkService: MerchantPasswordResetLinkService,
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
    this.queryStringId = this.route.snapshot.paramMap.get('id');
    this.queryStringKey = this.route.snapshot.paramMap.get('key');

    if (this.queryStringId && this.queryStringKey) {
      this.merchantPasswordResetLinkService.getByIdAndKey(this.queryStringId, this.queryStringKey).subscribe({
        next: result => this.onRetrieveData(result),
        error: () => this.router.navigate(['/message/password-reset-link-already-used'])
      });
    }
  }

  onRetrieveData(merchantPasswordResetLink: MerchantPasswordResetLink) {
    if (merchantPasswordResetLink.Used)
      this.router.navigate(['/message/password-reset-link-already-used']);

    this.merchantPasswordResetLink = merchantPasswordResetLink;
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

    this.merchantPasswordResetLinkService.resetPassword(this.queryStringId!, this.queryStringKey!, this.controlPassword.value!).subscribe({
      next: result => this.handleOnSubmitResult(result),
      error: error => this.handleOnSubmitError(error),
      complete: () => this.formLoading = false
    });
  }

  handleOnSubmitResult(result: MutationResult) {
    if (result.Success) {
      this.router.navigate(['/message/password-reset-finished']);
    } else {
      this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
    }
  }

  handleOnSubmitError(error: string) {
    this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
    this.formLoading = false;
  }
}