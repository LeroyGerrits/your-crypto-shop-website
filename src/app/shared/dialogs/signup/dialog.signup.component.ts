import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'dialog-signup',
    templateUrl: 'dialog.signup.component.html'
})
export class DialogSignUpComponent implements OnInit {
    controlEmailAddress = new FormControl('', Validators.required);
    controlGender = new FormControl('0', Validators.required)
    controlFirstName = new FormControl('');
    controlLastName = new FormControl('', Validators.required);

    form!: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    constructor(
        private router: Router,
        private dialogRefComponent: MatDialogRef<any>
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
        this.submitted = true;

        if (this.form.invalid) {
            return;
        }

        this.error = '';
        this.loading = true;
    }
}