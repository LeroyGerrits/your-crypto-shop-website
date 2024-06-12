import { ActivatedRoute, Router, RouterLink, convertToParamMap } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelCatalogProductComponent } from './product.component';
import { TestDataProducts } from 'src/assets/test-data/Products';
import { ProductService } from 'src/app/shared/services/product.service';
import { ShopService } from 'src/app/shared/services/shop.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { of, throwError } from 'rxjs';
import { TestDataShops } from 'src/assets/test-data/Shops';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ControlPanelCatalogProductListComponent } from './product-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CategoryService } from 'src/app/shared/services/category.service';
import { TestDataCategories } from 'src/assets/test-data/Categories';
import { MatTreeModule } from '@angular/material/tree';
import { GetProductResponse } from 'src/app/shared/models/response/get-product-response.model';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { FieldService } from 'src/app/shared/services/field.service';
import { TestDataFields } from 'src/assets/test-data/Fields';
import { CryptoWalletService } from 'src/app/shared/services/crypto-wallet.service';
import { TestDataCryptoWallets } from 'src/assets/test-data/CryptoWallets';

describe('ControlPanelCatalogProductComponent', () => {
  let component: ControlPanelCatalogProductComponent;
  let fixture: ComponentFixture<ControlPanelCatalogProductComponent>;

  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let cryptoWalletServiceSpy: jasmine.SpyObj<CryptoWalletService>;
  let fieldServiceSpy: jasmine.SpyObj<FieldService>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let shopServiceSpy: jasmine.SpyObj<ShopService>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getList']);
    categoryServiceSpy.getList.and.returnValue(of(TestDataCategories));

    cryptoWalletServiceSpy = jasmine.createSpyObj('CryptoWalletService', ['getList']);
    cryptoWalletServiceSpy.getList.and.returnValue(of(TestDataCryptoWallets));

    fieldServiceSpy = jasmine.createSpyObj('FieldService', ['getList']);
    fieldServiceSpy.getList.and.returnValue(of(TestDataFields));

    productServiceSpy = jasmine.createSpyObj('ProductService', ['getById', 'create', 'update']);
    productServiceSpy.getById.and.returnValue(of(<GetProductResponse>{ Product: TestDataProducts[0], CategoryIds: [TestDataCategories[0].Id] }));
    productServiceSpy.create.and.returnValue(of(mutationResult));
    productServiceSpy.update.and.returnValue(of(mutationResult));

    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    shopServiceSpy = jasmine.createSpyObj('ShopService', ['getList']);
    shopServiceSpy.getList.and.returnValue(of(TestDataShops));

    TestBed.configureTestingModule({
      declarations: [ControlPanelCatalogProductComponent],
      imports: [BrowserAnimationsModule, MatCheckboxModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTabsModule, MatTreeModule, ReactiveFormsModule, RouterLink, RouterTestingModule.withRoutes(
        [{ path: 'control-panel/catalog/products', component: ControlPanelCatalogProductListComponent }]
      )],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ productId: TestDataProducts[0].Id, shopId: TestDataProducts[0].ShopId }) } } },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: CryptoWalletService, useValue: cryptoWalletServiceSpy },
        { provide: FieldService, useValue: fieldServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        { provide: ProductService, useValue: productServiceSpy },
        { provide: ShopService, useValue: shopServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(ControlPanelCatalogProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not proceed submitting when required form values are not filled in', () => {
    component.controlName.setValue('');
    component.onSubmit();
    expect(component.formSubmitted).toBeTrue();
    expect(component.formLoading).toBeFalse();
  });

  it('should send a call to the product service when creating a new product', () => {
    component.queryStringProductId = '';
    component.queryStringShopId = TestDataProducts[0].ShopId;
    component.controlName.setValue(TestDataProducts[0].Name);
    component.controlShop.setValue(TestDataProducts[0].ShopId);
    component.controlPrice.setValue(TestDataProducts[0].Price!.toString());
    component.controlDescription.setValue(TestDataProducts[0].Description!);
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should send a call to the product service when updating an existing product', () => {
    component.queryStringProductId = TestDataProducts[0].Id;
    component.queryStringShopId = TestDataProducts[0].ShopId;
    component.controlName.setValue(TestDataProducts[0].Name);
    component.controlShop.setValue(TestDataProducts[0].ShopId);
    component.controlPrice.setValue(TestDataProducts[0].Price!.toString());
    component.controlDescription.setValue(TestDataProducts[0].Description!);
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should redirect when handling submit result and no errors are applicable', () => {
    const routerstub: Router = TestBed.inject(Router);
    spyOn(routerstub, 'navigate');

    const mutationResult = <MutationResult>{ Constraint: '', ErrorCode: 0, Identity: '', Message: '', Success: true };
    component.handleOnSubmitResult(mutationResult);
    expect(routerstub.navigate).toHaveBeenCalledWith(['/control-panel/catalog/products']);
  });

  it('should show a message when an unhandled error occurs', () => {
    component.handleOnSubmitError('Unhandled error');
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });

  it('should show an error when handling submit result and an error code is applicable', () => {
    const mutationResult = <MutationResult>{ Constraint: '', ErrorCode: 666, Identity: '', Message: 'Evil error' };
    component.handleOnSubmitResult(mutationResult);
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });

  it('should store a category in memory when it gets checked', () => {
    const fakeCheckboxChangeEvent = <MatCheckboxChange>{ checked: true };
    component.checkCategory(TestDataCategories[1], fakeCheckboxChangeEvent);
    expect(component.categoryIds.includes(TestDataCategories[1].Id)).toBeTrue();
  });

  it('should remove a category from memory when it gets unchecked', () => {
    const fakeCheckboxChangeEvent = <MatCheckboxChange>{ checked: false };
    component.checkCategory(TestDataCategories[0], fakeCheckboxChangeEvent);
    expect(component.categoryIds.includes(TestDataCategories[0].Id)).toBeFalse();
  });
});

describe('ControlPanelCatalogProductComponentWithErrors', () => {
  let component: ControlPanelCatalogProductComponent;
  let fixture: ComponentFixture<ControlPanelCatalogProductComponent>;

  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let fieldServiceSpy: jasmine.SpyObj<FieldService>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let shopServiceSpy: jasmine.SpyObj<ShopService>;
  
  beforeEach(() => {
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getList']);
    categoryServiceSpy.getList.and.returnValue(of(TestDataCategories));

    fieldServiceSpy = jasmine.createSpyObj('FieldService', ['getList']);
    fieldServiceSpy.getList.and.returnValue(of(TestDataFields));

    productServiceSpy = jasmine.createSpyObj('ProductService', ['getById', 'create', 'update']);
    productServiceSpy.getById.and.returnValue(of(<GetProductResponse>{ Product: TestDataProducts[0], CategoryIds: [''] }));
    productServiceSpy.create.and.returnValue(throwError(() => new Error('ERROR')));
    productServiceSpy.update.and.returnValue(throwError(() => new Error('ERROR')));

    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    shopServiceSpy = jasmine.createSpyObj('ShopService', ['getList']);
    shopServiceSpy.getList.and.returnValue(of(TestDataShops));

    TestBed.configureTestingModule({
      declarations: [ControlPanelCatalogProductComponent],
      imports: [BrowserAnimationsModule, MatCheckboxModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTabsModule, MatTreeModule, ReactiveFormsModule, RouterLink, RouterTestingModule.withRoutes(
        [{ path: 'control-panel/catalog/products', component: ControlPanelCatalogProductListComponent }]
      )],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ productId: 'new', shopId: TestDataProducts[0].ShopId }) } } },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: FieldService, useValue: fieldServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        { provide: ProductService, useValue: productServiceSpy },
        { provide: ShopService, useValue: shopServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(ControlPanelCatalogProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should trigger error handling when sending a call to the product service when creating a new product and the request fails', () => {
    component.queryStringProductId = '';
    component.queryStringShopId = TestDataProducts[0].ShopId;
    component.controlName.setValue(TestDataProducts[0].Name);
    component.controlShop.setValue(TestDataProducts[0].ShopId);
    component.controlPrice.setValue(TestDataProducts[0].Price!.toString());
    component.controlDescription.setValue(TestDataProducts[0].Description!);
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should trigger error handling when sending a call to the product service when updating an product shop and the request fails', () => {
    component.queryStringProductId = TestDataProducts[0].Id;
    component.queryStringShopId = TestDataProducts[0].ShopId;
    component.controlName.setValue(TestDataProducts[0].Name);
    component.controlShop.setValue(TestDataProducts[0].ShopId);
    component.controlPrice.setValue(TestDataProducts[0].Price!.toString());
    component.controlDescription.setValue(TestDataProducts[0].Description!);
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });
});