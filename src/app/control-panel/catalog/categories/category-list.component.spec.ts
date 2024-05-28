import { ActivatedRoute, RouterLink } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryService } from 'src/app/shared/services/-category.service';
import { ControlPanelCatalogCategoryListComponent } from './category-list.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTreeModule } from '@angular/material/tree';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { RouterTestingModule } from '@angular/router/testing';
import { ShopService } from 'src/app/shared/services/-shop.service';
import { TestDataCategories } from 'src/assets/test-data/Categories';
import { TestDataShops } from 'src/assets/test-data/Shops';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ControlPanelCatalogCategoryListComponent', () => {
  let component: ControlPanelCatalogCategoryListComponent;
  let fixture: ComponentFixture<ControlPanelCatalogCategoryListComponent>;

  let matDialogRefSpy: any;
  let matDialogSpy: jasmine.SpyObj<MatDialog>
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let shopServiceSpy: jasmine.SpyObj<ShopService>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogRefSpy.componentInstance = { title: '', message: '' };
    matDialogRefSpy.afterClosed = () => of(true);

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogSpy.open.and.returnValue(matDialogRefSpy);

    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['changeParent', 'getList', 'delete', 'moveDown', 'moveUp']);
    categoryServiceSpy.changeParent.and.returnValue(of(mutationResult));
    categoryServiceSpy.getList.and.returnValue(of(TestDataCategories));
    categoryServiceSpy.delete.and.returnValue(of(mutationResult));
    categoryServiceSpy.moveDown.and.returnValue(of(mutationResult));
    categoryServiceSpy.moveUp.and.returnValue(of(mutationResult));

    shopServiceSpy = jasmine.createSpyObj('ShopService', ['getList']);
    shopServiceSpy.getList.and.returnValue(of(TestDataShops));

    TestBed.configureTestingModule({
    declarations: [ControlPanelCatalogCategoryListComponent],
    imports: [BrowserAnimationsModule, FormsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatRadioModule, MatSelectModule, MatTreeModule, ReactiveFormsModule, RouterLink, RouterLink, RouterTestingModule.withRoutes([{ path: 'control-panel/catalog/categories', component: ControlPanelCatalogCategoryListComponent }])],
    providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { data: {} } } },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: ShopService, useValue: shopServiceSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    fixture = TestBed.createComponent(ControlPanelCatalogCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should bla', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should show a dialog when add icon is clicked', () => {
    component.addCategory(TestDataCategories[0]);
    expect(matDialogSpy.open).toHaveBeenCalled();
  });

  it('should show a dialog when edit icon is clicked', () => {
    component.editCategory(TestDataCategories[0]);
    expect(matDialogSpy.open).toHaveBeenCalled();
  });

  it('should show a dialog when delete icon is clicked', () => {
    component.deleteCategory(TestDataCategories[0]);
    expect(matDialogSpy.open).toHaveBeenCalled();
  });

  it('should make a call to the category service when a category is moved down', () => {
    component.moveCategoryDown(TestDataCategories[0]);
    expect(categoryServiceSpy.moveDown).toHaveBeenCalled();
  });

  it('should make a call to the category service when a category is moved up', () => {
    component.moveCategoryUp(TestDataCategories[0]);
    expect(categoryServiceSpy.moveUp).toHaveBeenCalled();
  });

  it('should set a changing parent selection when a category gets marked for parent changing', () => {
    component.changeCategoryParent(TestDataCategories[0]);
    expect(component.changingParent).toBeTrue();
    expect(component.changingParentCategory).toBe(TestDataCategories[0]);
  });

  it('should clear changing parent selection when a category gets marked for parent changing and then the cancel buttons gets clicked', () => {
    component.changeCategoryParentCancel();
    expect(component.changingParent).toBeFalse();
    expect(component.changingParentCategory).toBe(undefined);
  });

  it('should do nothing when the parent category saving method gets called but no new parent selection is active', () => {
    component.changeCategoryParentSave();
    expect(component).toBeTruthy();
  });

  it('should save new parent category selection when a category gets marked for parent changing and then the save buttons gets clicked', () => {
    component.changeCategoryParent(TestDataCategories[0]);
    component.changeCategoryParentSave();
    expect(categoryServiceSpy.changeParent).toHaveBeenCalled();
  });

  it('should refresh when handling submit result and no error code is applicable', () => {
    spyOn(component, 'retrieveCategoriesByShopId');
    const mutationResult = <MutationResult>{ Constraint: '', ErrorCode: 0, Identity: '', Message: '', Success: true };
    component.handleOnSubmitResult(mutationResult);
    expect(component.retrieveCategoriesByShopId).toHaveBeenCalled();
  });

  it('should show an error when handling submit result and an error code is applicable', () => {
    const mutationResult = <MutationResult>{ Constraint: '', ErrorCode: 666, Identity: '', Message: 'Evil error' };
    component.handleOnSubmitResult(mutationResult);
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });

  it('should show a message when an unhandled error occurs', () => {
    component.handleOnSubmitError('Unhandled error');
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });

  it('should trigger error handling when sending a call to the category service when deleting a category and the request fails', () => {
    categoryServiceSpy.delete.and.returnValue(throwError(() => new Error('ERROR')));
    component.deleteCategory(TestDataCategories[0]);
    expect(component).toBeTruthy();
  });

  it('should trigger error handling when sending a call to the category service when moving a category down and the request fails', () => {
    categoryServiceSpy.moveDown.and.returnValue(throwError(() => new Error('ERROR')));
    component.moveCategoryDown(TestDataCategories[0]);
    expect(component).toBeTruthy();
  });

  it('should trigger error handling when sending a call to the category service when moving a category up and the request fails', () => {
    categoryServiceSpy.moveUp.and.returnValue(throwError(() => new Error('ERROR')));
    component.moveCategoryUp(TestDataCategories[0]);
    expect(component).toBeTruthy();
  });

  it('should trigger error handling when sending a call to the category service when changing the parent of a category and the request fails', () => {
    categoryServiceSpy.changeParent.and.returnValue(throwError(() => new Error('ERROR')));
    component.changeCategoryParent(TestDataCategories[0]);
    component.changeCategoryParentSave();
    expect(component).toBeTruthy();
  });

  it('should not retrieve categories when there are no shops', () => {
    shopServiceSpy.getList.and.returnValue(of([]));
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});