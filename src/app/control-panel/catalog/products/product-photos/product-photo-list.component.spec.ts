import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterLink, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { GetProductResponse } from 'src/app/shared/models/response/GetProductResponse.model';
import { FileSizePipe } from 'src/app/shared/pipes/FileSize.pipe';
import { CategoryService } from 'src/app/shared/services/Category.service';
import { ProductService } from 'src/app/shared/services/Product.service';
import { ProductPhotoService } from 'src/app/shared/services/ProductPhoto.service';
import { TestDataProductPhotos } from 'src/assets/test-data/ProductPhotos';
import { TestDataProducts } from 'src/assets/test-data/Products';
import { ControlPanelCatalogProductPhotoListComponent } from './product-photo-list.component';
import { MatMenuModule } from '@angular/material/menu';

describe('ControlPanelCatalogProductPhotoListComponent', () => {
  let component: ControlPanelCatalogProductPhotoListComponent;
  let fixture: ComponentFixture<ControlPanelCatalogProductPhotoListComponent>;

  let matDialogRefSpy: any;
  let matDialogSpy: jasmine.SpyObj<MatDialog>
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let ProductPhotoServiceSpy: jasmine.SpyObj<ProductPhotoService>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogRefSpy.componentInstance = { title: '', message: '' };
    matDialogRefSpy.afterClosed = () => of(true);

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogSpy.open.and.returnValue(matDialogRefSpy);

    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    productServiceSpy = jasmine.createSpyObj('ProductService', ['getById']);
    productServiceSpy.getById.and.returnValue(of(<GetProductResponse>{ Product: TestDataProducts[0], CategoryIds: [''] }));

    ProductPhotoServiceSpy = jasmine.createSpyObj('ShopService', ['getList']);
    ProductPhotoServiceSpy.getList.and.returnValue(of(TestDataProductPhotos));

    TestBed.configureTestingModule({
      declarations: [ControlPanelCatalogProductPhotoListComponent],
      imports: [BrowserAnimationsModule, HttpClientTestingModule, MatIconModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatPaginatorModule, MatSelectModule, MatTableModule, ReactiveFormsModule, RouterLink, RouterTestingModule.withRoutes(
        [{ path: 'control-panel/catalog/products', component: ControlPanelCatalogProductPhotoListComponent }]
      )],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { data: {} } } },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ productId: TestDataProducts[0].Id, shopId: TestDataProducts[0].ShopId }) } } },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: ProductService, useValue: productServiceSpy },
        { provide: ProductPhotoService, useValue: ProductPhotoServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        ControlPanelCatalogProductPhotoListComponent,
        FileSizePipe,
        Router
      ]
    });
    fixture = TestBed.createComponent(ControlPanelCatalogProductPhotoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});