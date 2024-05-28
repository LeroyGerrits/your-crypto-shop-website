import { FormControl, FormGroup } from '@angular/forms';

import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { ProductPhoto } from 'src/app/shared/models/product-photo.model';
import { ProductPhotoService } from 'src/app/shared/services/product-photo.service';

export interface DialogData {
    productPhotoToEdit: ProductPhoto | null;
}

@Component({
    selector: 'control-panel-catalog-product-photo',
    templateUrl: 'product-photo.component.html',
    encapsulation: ViewEncapsulation.Emulated
})
export class ControlPanelCatalogProductPhotoComponent implements OnInit, OnDestroy {
    public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

    controlDescription = new FormControl('');

    public form!: FormGroup;
    public formLoading = false;
    public formSubmitted = false;

    public productPhoto: ProductPhoto = new ProductPhoto();

    constructor(
        private productPhotoService: ProductPhotoService,
        private dialogRefComponent: MatDialogRef<any>,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        this.form = new FormGroup([
            this.controlDescription
        ]);
    }

    ngOnInit() {
        if (this.data.productPhotoToEdit) {
            this.productPhoto = this.data.productPhotoToEdit;

            if (this.productPhoto.Description)
                this.controlDescription.setValue(this.productPhoto.Description);
        }
    }

    ngOnDestroy() {
        this.snackBarRef?.dismiss();
    }

    onSubmit() {
        this.formSubmitted = true;
        this.formLoading = true;

        this.productPhotoService.changeDescription(this.data.productPhotoToEdit!.Id, this.controlDescription.value!).subscribe({
            next: result => this.handleOnSubmitResult(result),
            error: error => this.handleOnSubmitError(error),
            complete: () => this.formLoading = false
        });
    }

    handleOnSubmitResult(result: MutationResult) {
        if (result.Success) {
            this.dialogRefComponent.close();
        } else {
            this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
        }
    }

    handleOnSubmitError(error: string) {
        this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
        this.formLoading = false;
    }
}