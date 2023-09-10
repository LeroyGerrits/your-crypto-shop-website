import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/shared/models/Category.model';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Shop } from 'src/app/shared/models/Shop.model';
import { CategoryService } from 'src/app/shared/services/Category.service';

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
export class ControlPanelCatalogCategoryComponent implements OnInit {
    public queryStringCategoryId: string | null = '';

    controlName = new FormControl('', Validators.required)
    controlVisible = new FormControl(true);

    public form!: FormGroup;
    public formLoading = false;
    public formSubmitted = false;
    public formError = '';

    public pageTitle = 'Create new category'
    public category: Category = new Category();

    constructor(
        private categoryService: CategoryService,
        private dialogRefComponent: MatDialogRef<any>,
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

    onSubmit() {
        this.formSubmitted = true;

        if (this.form.invalid) {
            return;
        }

        this.formError = '';
        this.formLoading = true;

        const categoryToUpdate: Category = Object.assign({}, this.category)
        categoryToUpdate.Shop = this.data.selectedShop;
        categoryToUpdate.Name = this.controlName.value!;
        categoryToUpdate.Visible = this.controlVisible.value!;

        if (this.data.parentCategory)
            categoryToUpdate.Parent = this.data.parentCategory;

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