import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/app/shared/services/Authentication.service';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
    selector: 'dialog-login',
    templateUrl: 'dialog.login.component.html'
})
export class DialogLoginComponent {
    controlUsername = new FormControl('', Validators.required);
    controlPassword = new FormControl('', Validators.required)

    form!: FormGroup;
    loading = false;
    submitted = false;
    error = '';

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
        this.submitted = true;

        if (this.form.invalid) {
            return;
        }

        this.error = '';
        this.loading = true;

        this.authenticationService.login(this.controlUsername.value!, this.controlPassword.value!)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.router.navigate(['/account']);

                    if (this.dialogRefComponent)
                        this.dialogRefComponent.close();
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });
    }
}