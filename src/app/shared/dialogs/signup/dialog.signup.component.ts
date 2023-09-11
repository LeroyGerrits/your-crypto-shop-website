import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { Merchant } from '../../models/Merchant.model';
import { MerchantService } from '../../services/Merchant.service';
import { MutationResult } from '../../models/MutationResult';

@Component({
    selector: 'dialog-signup',
    templateUrl: 'dialog.signup.component.html'
})
export class DialogSignUpComponent implements OnInit {
    public controlEmailAddress = new FormControl('', Validators.required);
    public controlGender = new FormControl('0', Validators.required)
    public controlFirstName = new FormControl('');
    public controlLastName = new FormControl('', Validators.required);

    public form!: FormGroup;
    public formLoading = false;
    public formSubmitted = false;
    public formError = '';

    constructor(
        private dialogRefComponent: MatDialogRef<any>,
        private merchantService: MerchantService
    ) {
        this.form = new FormGroup([
            this.controlEmailAddress,
            this.controlGender,
            this.controlFirstName,
            this.controlLastName
        ]);
    }

    ngOnInit() {

    }

    onSubmit() {
        this.formSubmitted = true;

        if (this.form.invalid) {
            return;
        }

        const merchantToCreate: Merchant = {
            Id: '',
            Salutation: '',
            EmailAddress: this.controlEmailAddress.value!,
            FirstName: this.controlFirstName.value!,
            LastName: this.controlLastName.value!,
            Gender: parseInt(this.controlGender.value!)
        };        

        this.merchantService.create(merchantToCreate).subscribe({
            next: result => this.handleOnSubmitResult(result),
            error: error => this.handleOnSubmitError(error),
            complete: () => {
                this.formLoading = false
                this.formLoading = true;
            }
        });
    }

    handleOnSubmitResult(result: MutationResult) {
        if (result.ErrorCode == 0) {
            this.dialogRefComponent.close();
        } else {
            this.formError = result.Message;
        }
    }

    handleOnSubmitError(error: string) {
        this.formError = error;
        this.formLoading = false;
    }
}