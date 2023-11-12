import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/app/shared/services/Authentication.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
    selector: 'dialog-login',
    templateUrl: 'dialog.login.component.html'
})
export class DialogLoginComponent implements OnInit {
    controlUsername = new FormControl('', Validators.required);
    controlPassword = new FormControl('', Validators.required)

    public form!: FormGroup;
    public formLoading = false;
    public formSubmitted = false;
    public formError = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private dialogRefComponent: MatDialogRef<any>
    ) { }

    ngOnInit() {
        this.form = new FormGroup([
            this.controlUsername,
            this.controlPassword
        ]);
    }

    onSubmit() {
        this.formSubmitted = true;

        if (this.form.invalid) {
            return;
        }

        this.formError = '';
        this.formLoading = true;

        this.authenticationService.login(this.controlUsername.value!, this.controlPassword.value!)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.router.navigate(['/control-panel']);

                    if (this.dialogRefComponent)
                        this.dialogRefComponent.close();
                },
                error: error => {
                    this.formError = error;
                    this.formLoading = false;
                }
            });
    }
}