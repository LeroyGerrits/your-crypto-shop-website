import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { Component } from '@angular/core';
import { Constants } from '../../-constants';
import { MatDialogRef } from '@angular/material/dialog';
import { Merchant } from '../../models/-merchant.model';
import { MerchantService } from '../../services/-merchant.service';
import { MutationResult } from '../../models/mutation-result.model';
import { Router } from '@angular/router';

@Component({
    selector: 'dialog-signup',
    templateUrl: 'dialog.signup.component.html'
})
export class DialogSignUpComponent {
    constants = Constants;

    public controlEmailAddress = new FormControl('', [Validators.required, Validators.email]);
    public controlUsername = new FormControl('', [Validators.maxLength(50), Validators.required]);
    public controlGender = new FormControl('0', Validators.required)
    public controlFirstName = new FormControl('', Validators.maxLength(255));
    public controlLastName = new FormControl('', [Validators.maxLength(255), Validators.required]);

    public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

    public form!: FormGroup;
    public formLoading = false;
    public formSubmitted = false;

    constructor(
        private dialogRefComponent: MatDialogRef<any>,
        private merchantService: MerchantService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.form = new FormGroup([
            this.controlEmailAddress,
            this.controlUsername,
            this.controlGender,
            this.controlFirstName,
            this.controlLastName
        ]);
    }

    onSubmit() {
        this.formSubmitted = true;

        if (this.form.invalid) {
            return;
        }

        const merchantToCreate: Merchant = {
            Salutation: '',
            Username: this.controlUsername.value!,
            EmailAddress: this.controlEmailAddress.value!,
            FirstName: this.controlFirstName.value!,
            LastName: this.controlLastName.value!,
            Gender: parseInt(this.controlGender.value!)
        };

        this.merchantService.create(merchantToCreate).subscribe({
            next: result => this.handleOnSubmitResult(result),
            error: error => this.handleOnSubmitError(error),
            complete: () => this.formLoading = false
        });
    }

    handleOnSubmitResult(result: MutationResult) {
        if (result.Success) {
            if (this.dialogRefComponent)
                this.dialogRefComponent.close();

            this.router.navigate(['/message/account-registered']);
        } else {
            if (result.Constraint == 'UNIQUE_Merchant_EmailAddress') {
                this.snackBarRef = this.snackBar.open(`The e-mail address ${this.controlEmailAddress.value} is already in use.`, 'Close', { panelClass: ['error-snackbar'] });
            } else if (result.Constraint == 'UNIQUE_Merchant_Username') {
                this.snackBarRef = this.snackBar.open(`The username ${this.controlUsername.value} is already in use.`, 'Close', { panelClass: ['error-snackbar'] });
            } else {
                this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
            }
        }
    }

    handleOnSubmitError(error: string) {
        this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
        this.formLoading = false;
    }
}