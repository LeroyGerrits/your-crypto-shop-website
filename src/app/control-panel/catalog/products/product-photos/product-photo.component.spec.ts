import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';

import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { ProductPhoto } from 'src/app/shared/models/ProductPhoto.model';
import { ProductPhotoService } from 'src/app/shared/services/ProductPhoto.service';
import { TestDataProductPhotos } from 'src/assets/test-data/ProductPhotos';
import { ControlPanelCatalogProductPhotoComponent } from './product-photo.component';

export interface DialogData {
  productPhotoToEdit: ProductPhoto | null;
}

describe('ControlPanelCatalogProductPhotoComponent', () => {
  let component: ControlPanelCatalogProductPhotoComponent;
  let fixture: ComponentFixture<ControlPanelCatalogProductPhotoComponent>;

  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let matDialogRefSpy: any;
  let ProductPhotoServiceSpy: jasmine.SpyObj<ProductPhotoService>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  let mockDialogData: DialogData = {
    productPhotoToEdit: TestDataProductPhotos[0]
  };

  beforeEach(() => {
    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogRefSpy.close = () => of(true);

    ProductPhotoServiceSpy = jasmine.createSpyObj('ProductPhotoService', ['changeDescription']);
    ProductPhotoServiceSpy.changeDescription.and.returnValue(of(mutationResult));

    TestBed.configureTestingModule({
      declarations: [ControlPanelCatalogProductPhotoComponent],
      imports: [BrowserAnimationsModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        { provide: ProductPhotoService, useValue: ProductPhotoServiceSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ]
    });
    fixture = TestBed.createComponent(ControlPanelCatalogProductPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not proceed submitting when required form values are not filled in', () => {
    component.controlDescription.setValue('');
    component.onSubmit();
    expect(component.formSubmitted).toBeTrue();
    expect(component.formLoading).toBeFalse();
  });

  it('should send a call to the ProductPhoto service when updating an existing ProductPhoto', () => {
    component.data.productPhotoToEdit = TestDataProductPhotos[0];
    component.ngOnInit();
    component.controlDescription.setValue(TestDataProductPhotos[0].Description!);
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
});

describe('ControlPanelCatalogProductPhotoComponentWithErrors', () => {
  let component: ControlPanelCatalogProductPhotoComponent;
  let fixture: ComponentFixture<ControlPanelCatalogProductPhotoComponent>;

  let matDialogRefSpy: any;
  let ProductPhotoServiceSpy: jasmine.SpyObj<ProductPhotoService>;

  let mockDialogData: DialogData = {
    productPhotoToEdit: TestDataProductPhotos[0],
  };

  beforeEach(() => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogRefSpy.close = () => of(true);

    ProductPhotoServiceSpy = jasmine.createSpyObj('ProductPhotoService', ['changeDescription']);
    ProductPhotoServiceSpy.changeDescription.and.returnValue(throwError(() => new Error('ERROR')));

    TestBed.configureTestingModule({
      declarations: [ControlPanelCatalogProductPhotoComponent],
      imports: [BrowserAnimationsModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: ProductPhotoService, useValue: ProductPhotoServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(ControlPanelCatalogProductPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should trigger error handling when sending a call to the ProductPhoto service when updating an existing ProductPhoto and the request fails', () => {
    component.controlDescription.setValue(TestDataProductPhotos[0].Description!);
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });
});