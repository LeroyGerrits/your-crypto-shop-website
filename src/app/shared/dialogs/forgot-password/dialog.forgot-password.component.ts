import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { MatDialogRef } from '@angular/material/dialog';
import { MerchantService } from '../../services/Merchant.service';
import { Router } from '@angular/router';

@Component({
    selector: 'dialog-forgot-password',
    templateUrl: 'dialog.forgot-password.component.html'
})
export class DialogForgotPasswordComponent implements OnInit {
    controlEmailAddress = new FormControl('', [Validators.required, Validators.email]);

    public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

    public form!: FormGroup;
    public formLoading = false;
    public formSubmitted = false;

    constructor(
        private router: Router,
        private dialogRefComponent: MatDialogRef<any>,
        private merchantService: MerchantService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        this.form = new FormGroup([
            this.controlEmailAddress
        ]);
    }

    onSubmit() {
        this.formSubmitted = true;

        if (this.form.invalid) {
            return;
        }

        this.formLoading = true;

        this.merchantService.forgotPassword(this.controlEmailAddress.value!).subscribe({
            next: () => {
                if (this.dialogRefComponent)
                    this.dialogRefComponent.close();

                this.router.navigate(['/message/password-reset-link-sent']);
            },
            error: error => {
                this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
                this.formLoading = false;
            },
            complete: () => this.formLoading = false
        });
    }
}