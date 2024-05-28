import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';

import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Category } from 'src/app/shared/models/-category.model';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { Shop } from 'src/app/shared/models/-shop.model';
import { CategoryService } from 'src/app/shared/services/-category.service';
import { TestDataCategories } from 'src/assets/test-data/Categories';
import { TestDataShops } from 'src/assets/test-data/Shops';
import { ControlPanelCatalogCategoryComponent } from './category.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  selectedShop: Shop;
  categoryToEdit: Category | null;
  parentCategory: Category | null;
}

describe('ControlPanelCatalogCategoryComponent', () => {
  let component: ControlPanelCatalogCategoryComponent;
  let fixture: ComponentFixture<ControlPanelCatalogCategoryComponent>;

  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let matDialogRefSpy: any;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  let mockDialogData: DialogData = {
    selectedShop: TestDataShops[0],
    categoryToEdit: TestDataCategories[0],
    parentCategory: null
  };

  beforeEach(() => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogRefSpy.close = () => of(true);

    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['create', 'update']);
    categoryServiceSpy.create.and.returnValue(of(mutationResult));
    categoryServiceSpy.update.and.returnValue(of(mutationResult));

    TestBed.configureTestingModule({
      declarations: [ControlPanelCatalogCategoryComponent],
      imports: [BrowserAnimationsModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
      providers: [
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ]
    });
    fixture = TestBed.createComponent(ControlPanelCatalogCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set a page title mentioning the category name when editing', () => {
    component.data.categoryToEdit = TestDataCategories[0];
    component.ngOnInit();
    expect(component.pageTitle).toBe(TestDataCategories[0].Name);
  });

  it('should set a page title mentioning the parent category when creating a new sub-category', () => {
    component.data.categoryToEdit = null;
    component.data.parentCategory = TestDataCategories[0];
    component.ngOnInit();
    expect(component.pageTitle).toBe(`Create new sub-category for '${TestDataCategories[0].Name}'`);
  });

  it('should not proceed submitting when required form values are not filled in', () => {
    component.controlName.setValue('');
    component.onSubmit();
    expect(component.formSubmitted).toBeTrue();
    expect(component.formLoading).toBeFalse();
  });

  it('should send a call to the category service when creating a new category', () => {
    component.data.selectedShop = TestDataShops[0];
    component.data.categoryToEdit = null;
    component.data.parentCategory = TestDataCategories[0];
    component.ngOnInit();
    component.controlName.setValue(TestDataCategories[0].Name);
    component.controlVisible.setValue(true);
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should send a call to the category service when updating an existing category', () => {
    component.data.selectedShop = TestDataShops[0];
    component.data.categoryToEdit = TestDataCategories[0];
    component.data.parentCategory = null;
    component.ngOnInit();
    component.controlName.setValue(TestDataCategories[0].Name);
    component.controlVisible.setValue(true);
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should close the dialog when handling submit result and no errors are applicable', () => {
    spyOn(matDialogRefSpy, 'close');
    const mutationResult = <MutationResult>{ Constraint: '', ErrorCode: 0, Identity: '', Message: '', Success: true };
    component.handleOnSubmitResult(mutationResult);
    expect(matDialogRefSpy.close).toHaveBeenCalled();
  });

  it('should show a message when an unhandled error occurs', () => {
    const error = 'Unhandled error'
    component.handleOnSubmitError(error);
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });

  it('should show an error when handling submit result and an error code is applicable', () => {
    const error = 'Evil error'
    const mutationResult = <MutationResult>{ Constraint: '', ErrorCode: 666, Identity: '', Message: error };
    component.handleOnSubmitResult(mutationResult);
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });

  it('should trigger error handling when sending a call to the category service when creating a new category and the request fails', () => {
    categoryServiceSpy.create.and.returnValue(throwError(() => new Error('ERROR')));

    component.queryStringCategoryId = '';
    component.data.categoryToEdit = null;
    component.data.selectedShop = TestDataShops[0];
    component.controlName.setValue(TestDataCategories[0].Name);
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should trigger error handling when sending a call to the category service when updating an existing category and the request fails', () => {
    categoryServiceSpy.update.and.returnValue(throwError(() => new Error('ERROR')));

    component.queryStringCategoryId = TestDataCategories[0].Id;
    component.data.categoryToEdit = TestDataCategories[0];
    component.controlName.setValue(TestDataCategories[0].Name);
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });
});