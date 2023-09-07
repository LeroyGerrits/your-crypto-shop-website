import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/shared/models/Category.model';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Shop } from 'src/app/shared/models/Shop.model';
import { CategoryService } from 'src/app/shared/services/Category.service';

export interface DialogData {
    selectedShopId: string;
    categoryToEdit: Category;
    parentCategory: Category;
  }
  
@Component({
    selector: 'control-panel-catalog-category',
    templateUrl: 'category.component.html'
})
export class ControlPanelCatalogCategoryComponent {
    public queryStringCategoryId: string | null = '';

    controlName = new FormControl('', Validators.required)

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
        console.log(data.categoryToEdit);

        if (this.data.categoryToEdit) {
            this.pageTitle = this.data.categoryToEdit.Name;
            this.category = this.data.categoryToEdit;
            this.controlName.setValue(this.category.Name);
        } else {
            if (this.data.parentCategory) {
                this.pageTitle = `Create new sub-category for '${this.data.parentCategory.Name}'`;
            }
        }
    }

    ngOnInit() {
        this.form = new FormGroup([
            this.controlName
        ]);
    }

    onSubmit() {
        this.formSubmitted = true;

        if (this.form.invalid) {
            return;
        }

        this.formError = '';
        this.formLoading = true;

        const categoryToUpdate: Category = Object.assign({}, this.category)
        categoryToUpdate.Shop = new Shop();
        categoryToUpdate.Shop.Id = this.data.selectedShopId;
        categoryToUpdate.Name = this.controlName.value!;

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