import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterLink, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { GetProductResponse } from 'src/app/shared/models/response/GetProductResponse.model';
import { FileUploadProgress } from 'src/app/shared/models/system/FileUploadProgress.model';
import { FileSizePipe } from 'src/app/shared/pipes/file-size.pipe';
import { ProductService } from 'src/app/shared/services/-product.service';
import { ProductPhotoService } from 'src/app/shared/services/product-photo.service';
import { TestDataProductPhotos } from 'src/assets/test-data/ProductPhotos';
import { TestDataProducts } from 'src/assets/test-data/Products';
import { ControlPanelCatalogProductPhotoListComponent } from './product-photo-list.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

interface MockFile {
  name: string;
  body: string;
  mimeType: string;
  size: number;
}

const createFileFromMockFile = (file: MockFile): File => {
  const fileBody: string = '.'.repeat(file.size);
  const blob = new Blob([fileBody], { type: file.mimeType }) as any;
  blob['lastModifiedDate'] = new Date();
  blob['name'] = file.name;
  return blob as File;
};

const createMockFileList = (files: MockFile[]) => {
  const fileList: FileList = {
    length: files.length,
    item(index: number): File {
      return fileList[index];
    }
  };
  files.forEach((file, index) => fileList[index] = createFileFromMockFile(file));

  return fileList;
};

describe('ControlPanelCatalogProductPhotoListComponent', () => {
  let component: ControlPanelCatalogProductPhotoListComponent;
  let fixture: ComponentFixture<ControlPanelCatalogProductPhotoListComponent>;

  let matDialogRefSpy: any;
  let matDialogSpy: jasmine.SpyObj<MatDialog>
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let productPhotoServiceSpy: jasmine.SpyObj<ProductPhotoService>;
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

    productPhotoServiceSpy = jasmine.createSpyObj('ProductPhotoService', ['changeMain', 'changeVisible', 'delete', 'getList', 'moveDown', 'moveUp', 'upload']);
    productPhotoServiceSpy.changeMain.and.returnValue(of(mutationResult));
    productPhotoServiceSpy.changeVisible.and.returnValue(of(mutationResult));
    productPhotoServiceSpy.getList.and.returnValue(of(TestDataProductPhotos));
    productPhotoServiceSpy.delete.and.returnValue(of(mutationResult));
    productPhotoServiceSpy.moveDown.and.returnValue(of(mutationResult));
    productPhotoServiceSpy.moveUp.and.returnValue(of(mutationResult));
    productPhotoServiceSpy.upload.and.returnValue(of());

    TestBed.configureTestingModule({
    declarations: [ControlPanelCatalogProductPhotoListComponent, FileSizePipe],
    imports: [BrowserAnimationsModule, MatIconModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatPaginatorModule, MatSelectModule, MatTableModule, ReactiveFormsModule, RouterLink, RouterTestingModule.withRoutes([{ path: 'control-panel/catalog/products', component: ControlPanelCatalogProductPhotoListComponent }])],
    providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { data: {} } } },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ productId: TestDataProducts[0].Id, shopId: TestDataProducts[0].ShopId }) } } },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: ProductService, useValue: productServiceSpy },
        { provide: ProductPhotoService, useValue: productPhotoServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        ControlPanelCatalogProductPhotoListComponent,
        FileSizePipe,
        Router,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    fixture = TestBed.createComponent(ControlPanelCatalogProductPhotoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const emptyFileList = createMockFileList([]);
  const fileList = createMockFileList([
    { name: 'test.jpg', body: 'test', mimeType: 'text/plain', size: 123 },
    { name: 'wrong extension.txt', body: 'test', mimeType: 'text/plain', size: 123 },
    { name: 'bigfile.jpg', body: 'test', mimeType: 'text/plain', size: 99999999 }
  ]);

  it('should upload files', () => {
    component.uploadFile(fileList);
    expect(productPhotoServiceSpy.upload).toHaveBeenCalled();
  });

  it('should do nothing when empty files list gets submitted', () => {
    component.uploadFile(emptyFileList);
    expect(productPhotoServiceSpy.upload).toHaveBeenCalledTimes(0);
  });

  it('should show a dialog when add icon is clicked', () => {
    component.editDescription(TestDataProductPhotos[0]);
    expect(matDialogSpy.open).toHaveBeenCalled();
  });

  it('should make a call to the product photo service when a photo is set as main', () => {
    component.setMain(TestDataProductPhotos[0]);
    expect(productPhotoServiceSpy.changeMain).toHaveBeenCalled();
  });

  it('should make a call to the product photo service when a photo is set as visible', () => {
    component.setVisible(TestDataProductPhotos[0], true);
    expect(productPhotoServiceSpy.changeVisible).toHaveBeenCalled();
  });

  it('should make a call to the product photo service when a photo is moved up', () => {
    component.moveUp(TestDataProductPhotos[0]);
    expect(productPhotoServiceSpy.moveUp).toHaveBeenCalled();
  });

  it('should make a call to the product photo service when a photo is moved down', () => {
    component.moveDown(TestDataProductPhotos[0]);
    expect(productPhotoServiceSpy.moveDown).toHaveBeenCalled();
  });

  it('should show a dialog when delete icon is clicked', () => {
    component.delete(TestDataProductPhotos[0]);
    expect(matDialogSpy.open).toHaveBeenCalled();
  });

  it('should refresh when handling submit result and no error code is applicable', () => {
    spyOn(component, 'retrieveProductPhotos');
    const mutationResult = <MutationResult>{ Constraint: '', ErrorCode: 0, Identity: '', Message: '', Success: true };
    component.handleOnSubmitResult(mutationResult);
    expect(component.retrieveProductPhotos).toHaveBeenCalled();
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

  it('should retrieve product photos once all file uploads are finished', () => {
    spyOn(component, 'retrieveProductPhotos');
    const progress1 = <FileUploadProgress>{ Number: 1, FileName: 'test1.jpg', Progress: 100, Message: '', Finished: true, Visible: true };
    const progress2 = <FileUploadProgress>{ Number: 2, FileName: 'test2.jpg', Progress: 100, Message: '', Finished: true, Visible: true };
    const progress3 = <FileUploadProgress>{ Number: 3, FileName: 'test3.jpg', Progress: 100, Message: '', Finished: true, Visible: true };
    component.fileUploadProgressItems = [progress1, progress2, progress3];
    component.checkFileUploadsFinished();
    expect(component.retrieveProductPhotos).toHaveBeenCalled();
  });

  it('should hide a progress item when the hide button is clicked', () => {
    const progress1 = <FileUploadProgress>{ Number: 1, FileName: 'test1.jpg', Progress: 50, Message: '', Finished: false, Visible: true };
    const progress2 = <FileUploadProgress>{ Number: 2, FileName: 'test2.jpg', Progress: 50, Message: '', Finished: false, Visible: true };
    const progress3 = <FileUploadProgress>{ Number: 3, FileName: 'test3.jpg', Progress: 50, Message: '', Finished: false, Visible: true };
    component.fileUploadProgressItems = [progress1, progress2, progress3];
    component.hideFileUploadProgress(progress1);
    expect(component.fileUploadProgressItems[progress1.Number - 1].Visible).toBeFalse();
  });

  it('should trigger error handling when uploading files and the request to product photo service fails', () => {
    productPhotoServiceSpy.upload.and.returnValue(throwError(() => new Error('ERROR')));
    component.uploadFile(fileList);
    expect(productPhotoServiceSpy.upload).toHaveBeenCalled();
  });

  it('should trigger error handling when sending a call to the product photo service when deleting a product photo and the request fails', () => {
    productPhotoServiceSpy.delete.and.returnValue(throwError(() => new Error('ERROR')));
    component.delete(TestDataProductPhotos[0]);
    expect(component).toBeTruthy();
  });

  it('should trigger error handling when sending a call to the product photo service when setting a product photo as main and the request fails', () => {
    productPhotoServiceSpy.changeMain.and.returnValue(throwError(() => new Error('ERROR')));
    component.setMain(TestDataProductPhotos[0]);
    expect(productPhotoServiceSpy.changeMain).toHaveBeenCalled();
  });

  it('should trigger error handling when sending a call to the product photo service when setting a product photo as visible and the request fails', () => {
    productPhotoServiceSpy.changeVisible.and.returnValue(throwError(() => new Error('ERROR')));
    component.setVisible(TestDataProductPhotos[0], true);
    expect(productPhotoServiceSpy.changeVisible).toHaveBeenCalled();
  });

  it('should trigger error handling when sending a call to the product photo service when moving a product photo up and the request fails', () => {
    productPhotoServiceSpy.moveUp.and.returnValue(throwError(() => new Error('ERROR')));
    component.moveUp(TestDataProductPhotos[0]);
    expect(productPhotoServiceSpy.moveUp).toHaveBeenCalled();
  });

  it('should trigger error handling when sending a call to the product photo service when moving a product photo down and the request fails', () => {
    productPhotoServiceSpy.moveDown.and.returnValue(throwError(() => new Error('ERROR')));
    component.moveDown(TestDataProductPhotos[0]);
    expect(productPhotoServiceSpy.moveDown).toHaveBeenCalled();
  });
});