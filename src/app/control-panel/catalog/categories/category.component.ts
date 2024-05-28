import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/shared/models/-category.model';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { Shop } from 'src/app/shared/models/-shop.model';
import { CategoryService } from 'src/app/shared/services/-category.service';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

export interface DialogData {
    selectedShop: Shop;
    categoryToEdit: Category | null;
    parentCategory: Category | null;
}

@Component({
    selector: 'control-panel-catalog-category',
    templateUrl: 'category.component.html',
    encapsulation: ViewEncapsulation.Emulated
})
export class ControlPanelCatalogCategoryComponent implements OnInit, OnDestroy {
    public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

    public queryStringCategoryId: string | null = '';

    controlName = new FormControl('', Validators.required)
    controlVisible = new FormControl(true);

    public form!: FormGroup;
    public formLoading = false;
    public formSubmitted = false;

    public pageTitle = 'Create new category'
    public category: Category = new Category();

    constructor(
        private categoryService: CategoryService,
        private dialogRefComponent: MatDialogRef<any>,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        this.form = new FormGroup([
            this.controlName,
            this.controlVisible
        ]);
    }

    ngOnInit() {
        if (this.data.categoryToEdit) {
            this.pageTitle = this.data.categoryToEdit.Name;
            this.category = this.data.categoryToEdit;
            this.controlName.setValue(this.category.Name);
            this.controlVisible.setValue(this.category.Visible);
        } else {
            if (this.data.parentCategory) {
                this.pageTitle = `Create new sub-category for '${this.data.parentCategory.Name}'`;
            }
        }
    }

    ngOnDestroy() {
        this.snackBarRef?.dismiss();
    }

    onSubmit() {
        this.formSubmitted = true;

        if (this.form.invalid) {
            return;
        }

        this.formLoading = true;

        const categoryToUpdate: Category = Object.assign({}, this.category)
        categoryToUpdate.ShopId = this.data.selectedShop.Id;
        categoryToUpdate.Name = this.controlName.value!;
        categoryToUpdate.Visible = this.controlVisible.value!;

        if (this.data.parentCategory)
            categoryToUpdate.ParentId = this.data.parentCategory.Id;

        if (this.data.categoryToEdit) {
            this.categoryService.update(categoryToUpdate).subscribe({
                next: result => this.handleOnSubmitResult(result),
                error: error => this.handleOnSubmitError(error),
                complete: () => this.formLoading = false
            });
        } else {
            this.categoryService.create(categoryToUpdate).subscribe({
                next: result => this.handleOnSubmitResult(result),
                error: error => this.handleOnSubmitError(error),
                complete: () => this.formLoading = false
            });
        }
    }

    handleOnSubmitResult(result: MutationResult) {
        if (result.Success) {
            if (this.dialogRefComponent)
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