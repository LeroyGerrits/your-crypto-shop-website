import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Constants } from '../../Constants';
import { MatDialogRef } from '@angular/material/dialog';
import { Merchant } from '../../models/Merchant.model';
import { MerchantService } from '../../services/Merchant.service';
import { MutationResult } from '../../models/MutationResult';
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

    public form!: FormGroup;
    public formLoading = false;
    public formSubmitted = false;
    public formError = '';

    constructor(
        private dialogRefComponent: MatDialogRef<any>,
        private merchantService: MerchantService,
        private router: Router
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
                this.formError = `The e-mail address ${this.controlEmailAddress.value} is already in use.`;
            } else if (result.Constraint == 'UNIQUE_Merchant_Username') {
                this.formError = `The username ${this.controlUsername.value} is already in use.`;
            } else {
                this.formError = result.Message;
            }
        }
    }

    handleOnSubmitError(error: string) {
        this.formError = error;
        this.formLoading = false;
    }
}