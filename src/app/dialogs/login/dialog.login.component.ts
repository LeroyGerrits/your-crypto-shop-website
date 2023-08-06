import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private dialogRefComponent: MatDialogRef<any>
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    public get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.error = '';
        this.loading = true;

        this.authenticationService.login(this.f['username'].value, this.f['password'].value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.router.navigate(['/account/dashboard']);

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