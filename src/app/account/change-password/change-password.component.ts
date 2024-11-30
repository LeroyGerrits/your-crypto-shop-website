import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Component } from '@angular/core';
import { Merchant } from 'src/app/shared/models/merchant.model';
import { MerchantService } from 'src/app/shared/services/merchant.service';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { Router } from '@angular/router';

@Component({
    selector: 'account-change-password',
    templateUrl: './change-password.component.html',
    standalone: false
})

export class AccountChangePasswordComponent {
    public activeMerchant?: Merchant | null;

    public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

    public form!: FormGroup;
    public formLoading = false;
    public formSubmitted = false;

    public controlCurrentPassword = new FormControl('', Validators.required);
    public controlPassword = new FormControl('', Validators.required);
    public controlPasswordRepetition = new FormControl('', Validators.required);

    constructor(
        private authenticationService: AuthenticationService,
        private merchantService: MerchantService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.authenticationService.merchant.subscribe(x => this.activeMerchant = x?.Merchant);
        this.form = new FormGroup([
            this.controlCurrentPassword,
            this.controlPassword,
            this.controlPasswordRepetition
        ]);
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

        this.merchantService.changePassword(this.controlCurrentPassword.value!, this.controlPassword.value!).subscribe({
            next: result => this.handleOnSubmitResult(result),
            error: error => this.handleOnSubmitError(error),
            complete: () => this.formLoading = false
        });
    }

    handleOnSubmitResult(result: MutationResult) {
        if (result.Success) {
            this.router.navigate(['/message/account-password-changed']);
        } else {
            this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
        }
    }

    handleOnSubmitError(error: string) {
        this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
        this.formLoading = false;
    }
}