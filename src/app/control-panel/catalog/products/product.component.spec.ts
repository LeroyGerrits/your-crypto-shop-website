import { ActivatedRoute, RouterLink, convertToParamMap } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelCatalogProductComponent } from './product.component';
import { TestDataProducts } from 'src/assets/test-data/Products';
import { ProductService } from 'src/app/shared/services/Product.service';
import { ShopService } from 'src/app/shared/services/Shop.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MutationResult } from 'src/app/shared/models/MutationResult';
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
import { CategoryService } from 'src/app/shared/services/Category.service';
import { TestDataCategories } from 'src/assets/test-data/Categories';
import { MatTreeModule } from '@angular/material/tree';
import { GetProductResponse } from 'src/app/shared/models/response/GetProductResponse.model';
import { MatCheckboxModule } from '@angular/material/checkbox';

describe('ControlPanelCatalogProductComponent', () => {
  let component: ControlPanelCatalogProductComponent;
  let fixture: ComponentFixture<ControlPanelCatalogProductComponent>;

  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let shopServiceSpy: jasmine.SpyObj<ShopService>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getList']);
    categoryServiceSpy.getList.and.returnValue(of(TestDataCategories));

    productServiceSpy = jasmine.createSpyObj('ProductService', ['getById', 'create', 'update']);
    productServiceSpy.getById.and.returnValue(of(<GetProductResponse>{ Product: TestDataProducts[0], CategoryIds: [''] }));
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
        { provide: ProductService, useValue: productServiceSpy },
        { provide: ShopService, useValue: shopServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(ControlPanelCatalogProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('ControlPanelCatalogProductComponentWithErrors', () => {
  let component: ControlPanelCatalogProductComponent;
  let fixture: ComponentFixture<ControlPanelCatalogProductComponent>;

  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let shopServiceSpy: jasmine.SpyObj<ShopService>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getList']);
    categoryServiceSpy.getList.and.returnValue(of(TestDataCategories));

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
        { provide: ProductService, useValue: productServiceSpy },
        { provide: ShopService, useValue: shopServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(ControlPanelCatalogProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});