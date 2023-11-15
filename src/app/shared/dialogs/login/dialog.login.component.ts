import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { AuthenticationService } from 'src/app/shared/services/Authentication.service';
import { DialogForgotPasswordComponent } from '../forgot-password/dialog.forgot-password.component';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
    selector: 'dialog-login',
    templateUrl: 'dialog.login.component.html'
})
export class DialogLoginComponent implements OnInit {
    controlEmailAddress = new FormControl('', [Validators.required, Validators.email]);
    controlPassword = new FormControl('', Validators.required)

    public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

    public form!: FormGroup;
    public formLoading = false;
    public formSubmitted = false;

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private authenticationService: AuthenticationService,
        private dialogRefComponent: MatDialogRef<any>,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        this.form = new FormGroup([
            this.controlEmailAddress,
            this.controlPassword
        ]);
    }

    forgotPassword() {
        if (this.dialogRefComponent)
            this.dialogRefComponent.close();

        this.dialog.open(DialogForgotPasswordComponent);
    }

    onSubmit() {
        this.formSubmitted = true;

        if (this.form.invalid) {
            return;
        }

        this.formLoading = true;

        this.authenticationService.login(this.controlEmailAddress.value!, this.controlPassword.value!)
            .pipe(first())
            .subscribe({
                next: () => {
                    if (this.dialogRefComponent)
                        this.dialogRefComponent.close();

                    this.router.navigate(['/control-panel']);
                },
                error: error => {
                    this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
                    this.formLoading = false;
                }
            });
    }
}