import { ActivatedRoute, RouterLink, convertToParamMap } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelCatalogProductComponent } from './product.component';
import { TestDataProducts } from 'src/assets/test-data/Products';
import { ProductService } from 'src/app/shared/services/Product.service';
import { ShopService } from 'src/app/shared/services/Shop.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { of } from 'rxjs';
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

describe('ControlPanelCatalogProductComponent', () => {
  let component: ControlPanelCatalogProductComponent;
  let fixture: ComponentFixture<ControlPanelCatalogProductComponent>;

  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let shopServiceSpy: jasmine.SpyObj<ShopService>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getById', 'create', 'update']);
    productServiceSpy.getById.and.returnValue(of(TestDataProducts[0]));
    productServiceSpy.create.and.returnValue(of(mutationResult));
    productServiceSpy.update.and.returnValue(of(mutationResult));

    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    shopServiceSpy = jasmine.createSpyObj('ShopService', ['getList']);
    shopServiceSpy.getList.and.returnValue(of(TestDataShops));

    TestBed.configureTestingModule({
      declarations: [ControlPanelCatalogProductComponent],
      imports: [BrowserAnimationsModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTabsModule, ReactiveFormsModule, RouterLink, RouterTestingModule.withRoutes(
        [{ path: 'control-panel/catalog/products', component: ControlPanelCatalogProductListComponent }]
      )],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ productId: TestDataProducts[0].Id }) } } },
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