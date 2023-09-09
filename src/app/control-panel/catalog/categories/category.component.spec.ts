import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { AccountComponent } from 'src/app/account/account.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Category } from 'src/app/shared/models/Category.model';
import { CategoryService } from 'src/app/shared/services/Category.service';
import { ControlPanelCatalogCategoryComponent } from './category.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Shop } from 'src/app/shared/models/Shop.model';
import { TestDataCategories } from 'src/assets/test-data/Categories';
import { TestDataShops } from 'src/assets/test-data/Shops';
import { of } from 'rxjs';

export interface DialogData {
  selectedShop: Shop;
  categoryToEdit: Category | null;
  parentCategory: Category | null;
}

describe('ControlPanelCatalogCategoryComponent', () => {
  let component: ControlPanelCatalogCategoryComponent;
  let fixture: ComponentFixture<ControlPanelCatalogCategoryComponent>;

  let matDialogRefSpy: any;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let mutationResult: MutationResult = { ErrorCode: 0, Identity: '', Message: '' };

  let mockDialogData: DialogData = {
    selectedShop: TestDataShops[0],
    categoryToEdit: TestDataCategories[0],
    parentCategory: null
  };

  beforeEach(() => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogRefSpy.close = () => of(true);

    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['create', 'update']);
    categoryServiceSpy.create.and.returnValue(of(mutationResult));
    categoryServiceSpy.update.and.returnValue(of(mutationResult));

    TestBed.configureTestingModule({
      declarations: [ControlPanelCatalogCategoryComponent],
      imports: [BrowserAnimationsModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterTestingModule.withRoutes(
        [{ path: 'account', component: AccountComponent }]
      )],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: CategoryService, useVaue: categoryServiceSpy },
        HttpClient,
        HttpHandler
      ]
    });
    fixture = TestBed.createComponent(ControlPanelCatalogCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set a page title mentioning the category name when editing', () => {
    component.data.categoryToEdit = TestDataCategories[0];
    component.ngOnInit();
    expect(component.pageTitle).toBe(TestDataCategories[0].Name);
  });

  it('should set a page title mentioning the parent category when creating a new sub-category', () => {
    component.data.categoryToEdit = null;
    component.data.parentCategory = TestDataCategories[0].Parent!;
    component.ngOnInit();
    expect(component.pageTitle).toBe(`Create new sub-category for '${TestDataCategories[0].Parent!.Name}'`);
  });

  it('should not proceed submitting when required form values are not filled in', () => {
    component.controlName.setValue('');
    component.onSubmit();
    expect(component.formSubmitted).toBeTrue();
    expect(component.formLoading).toBeFalse();
  });

  it('should send a call to the category service when creating a new category', () => {
    component.data.selectedShop = TestDataCategories[0].Shop;
    component.data.categoryToEdit = null;
    component.data.parentCategory = TestDataCategories[0].Parent!;
    component.ngOnInit();
    component.controlName.setValue(TestDataCategories[0].Name);
    component.controlVisible.setValue(true);
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should send a call to the category service when updating an existing category', () => {
    component.data.selectedShop = TestDataCategories[0].Shop;
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
    const mutationResult = {
      Constraint: '',
      ErrorCode: 0,
      Identity: '',
      Message: ''
    };
    component.handleOnSubmitResult(mutationResult);
    expect(matDialogRefSpy.close).toHaveBeenCalled();
  });

  it('should show a message when an unhandled error occurs', () => {
    const error = 'Unhandled error'
    component.handleOnSubmitError(error);
    expect(component.formError).toBe(error);
  });

  it('should show an error when handling submit result and an error code is applicable', () => {
    const error ='Evil error'
    const mutationResult = {
      Constraint: '',
      ErrorCode: 666,
      Identity: '',
      Message: error
    };
    component.handleOnSubmitResult(mutationResult);
    expect(component.formError).toBe(error);
  });
});
