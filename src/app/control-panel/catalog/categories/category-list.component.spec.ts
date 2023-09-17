import { ActivatedRoute, RouterLink } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryService } from 'src/app/shared/services/Category.service';
import { ControlPanelCatalogCategoryListComponent } from './category-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTreeModule } from '@angular/material/tree';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { RouterTestingModule } from '@angular/router/testing';
import { ShopService } from 'src/app/shared/services/Shop.service';
import { TestDataCategories } from 'src/assets/test-data/Categories';
import { TestDataShops } from 'src/assets/test-data/Shops';
import { of } from 'rxjs';

describe('ControlPanelCatalogCategoryListComponent', () => {
  let component: ControlPanelCatalogCategoryListComponent;
  let fixture: ComponentFixture<ControlPanelCatalogCategoryListComponent>;

  let matDialogRefSpy: any;
  let matDialogSpy: jasmine.SpyObj<MatDialog>
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let shopServiceSpy: jasmine.SpyObj<ShopService>;
  let mutationResult: MutationResult = { ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogRefSpy.componentInstance = { title: '', message: '' };
    matDialogRefSpy.afterClosed = () => of(true);

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogSpy.open.and.returnValue(matDialogRefSpy);

    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getList', 'delete']);
    categoryServiceSpy.getList.and.returnValue(of(TestDataCategories));
    categoryServiceSpy.delete.and.returnValue(of(mutationResult));

    shopServiceSpy = jasmine.createSpyObj('ShopService', ['getList']);
    shopServiceSpy.getList.and.returnValue(of(TestDataShops));

    TestBed.configureTestingModule({
      declarations: [ControlPanelCatalogCategoryListComponent],
      imports: [BrowserAnimationsModule, FormsModule, HttpClientTestingModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatRadioModule, MatSelectModule, MatTreeModule, ReactiveFormsModule, RouterLink, RouterTestingModule.withRoutes(
        [{ path: 'control-panel/catalog/categories', component: ControlPanelCatalogCategoryListComponent }]
      )],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { data: {} } } },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: ShopService, useValue: shopServiceSpy },
        { provide: CategoryService, useVaue: categoryServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy }
      ]
    });
    fixture = TestBed.createComponent(ControlPanelCatalogCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
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

  it('should refresh when handling submit result and no error code is applicable', () => {
    spyOn(component, 'retrieveCategoriesByShopId');
    component.handleOnSubmitResult({ Constraint: '', ErrorCode: 0, Identity: '', Message: '' });
    expect(component.retrieveCategoriesByShopId).toHaveBeenCalled();
  });

  it('should show an error when handling submit result and an error code is applicable', () => {
    component.handleOnSubmitResult({ Constraint: '', ErrorCode: 666, Identity: '', Message: 'Evil error' });
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });

  it('should show a message when an unhandled error occurs', () => {
    component.handleOnSubmitError('Unhandled error');
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });
});