import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterLink, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';

import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { ShopService } from 'src/app/shared/services/shop.service';
import { TestDataShops } from 'src/assets/test-data/-shops';

import { FieldService } from 'src/app/shared/services/field.service';
import { TestDataFields } from 'src/assets/test-data/Fields';
import { ControlPanelConfigurationFieldComponent } from './field.component';

describe('ControlPanelConfigurationFieldComponent', () => {
  let component: ControlPanelConfigurationFieldComponent;
  let fixture: ComponentFixture<ControlPanelConfigurationFieldComponent>;

  let fieldServiceSpy: jasmine.SpyObj<FieldService>;
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let shopServiceSpy: jasmine.SpyObj<ShopService>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    fieldServiceSpy = jasmine.createSpyObj('FieldService', ['getById', 'create', 'update']);
    fieldServiceSpy.getById.and.returnValue(of(TestDataFields[0]));
    fieldServiceSpy.create.and.returnValue(of(mutationResult));
    fieldServiceSpy.update.and.returnValue(of(mutationResult));

    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    shopServiceSpy = jasmine.createSpyObj('ShopService', ['getList']);
    shopServiceSpy.getList.and.returnValue(of(TestDataShops));

    TestBed.configureTestingModule({
      declarations: [ControlPanelConfigurationFieldComponent],
      imports: [BrowserAnimationsModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, RouterLink, RouterTestingModule.withRoutes(
        [{ path: 'control-panel/configuration/fields', component: ControlPanelConfigurationFieldComponent }]
      )],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ fieldId: TestDataFields[0].Id }) } } },
        { provide: ShopService, useValue: shopServiceSpy },
        { provide: FieldService, useValue: fieldServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        Router
      ]
    });
    fixture = TestBed.createComponent(ControlPanelConfigurationFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set page title on data retrieval', () => {
    component.onRetrieveFieldData(TestDataFields[0]);
    expect(component.pageTitle).toBe(TestDataFields[0].Name);
  });

  it('should not proceed submitting when required form values are not filled in', () => {
    component.controlName.setValue('');
    component.onSubmit();
    expect(component.formSubmitted).toBeTrue();
    expect(component.formLoading).toBeFalse();
  });

  it('should send a call to the field service when creating a new field', () => {
    component.queryStringFieldId = '';
    component.controlName.setValue(TestDataFields[0].Name);
    component.controlShop.setValue(TestDataShops[0].Id);
    component.controlEntity.setValue(TestDataFields[0].Entity.toString());
    component.controlType.setValue(TestDataFields[0].Type.toString());
    component.controlUserDefinedMandatory.setValue(TestDataFields[0].UserDefinedMandatory);
    component.controlDataType.setValue(TestDataFields[0].DataType.toString());
    component.controlSortOrder.setValue(TestDataFields[0].SortOrder ? TestDataFields[0].SortOrder.toString() : '');
    component.controlVisible.setValue(TestDataFields[0].Visible);
    component.enumerations = TestDataFields[0].Enumerations!;
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should send a call to the field service when updating an existing field', () => {
    component.queryStringFieldId = TestDataFields[0].Id;
    component.controlName.setValue(TestDataFields[0].Name);
    component.controlShop.setValue(TestDataShops[0].Id);
    component.controlEntity.setValue(TestDataFields[0].Entity.toString());
    component.controlType.setValue(TestDataFields[0].Type.toString());
    component.controlUserDefinedMandatory.setValue(TestDataFields[0].UserDefinedMandatory);
    component.controlDataType.setValue(TestDataFields[0].DataType.toString());
    component.controlSortOrder.setValue(TestDataFields[0].SortOrder ? TestDataFields[0].SortOrder.toString() : '');
    component.controlVisible.setValue(TestDataFields[0].Visible);
    component.enumerations = TestDataFields[0].Enumerations!;
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should redirect when handling submit result and no errors are applicable', () => {
    const routerstub: Router = TestBed.inject(Router);
    spyOn(routerstub, 'navigate');

    const mutationResult = <MutationResult>{ Constraint: '', ErrorCode: 0, Identity: '', Message: '', Success: true };
    component.handleOnSubmitResult(mutationResult);
    expect(routerstub.navigate).toHaveBeenCalledWith(['/control-panel/configuration/fields']);
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

  it('should show a specific error when handling submit result and an error code with constraint \'UNIQUE_Field_Name\' is applicable', () => {
    const mutationResult = {
      Constraint: 'UNIQUE_Field_Name',
      ErrorCode: 666,
      Identity: '',
      Message: 'Evil error',
      Success: false
    };
    component.handleOnSubmitResult(mutationResult);
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });

  it('should trigger error handling when sending a call to the field service when creating a new field and the request fails', () => {
    fieldServiceSpy.create.and.returnValue(throwError(() => new Error('ERROR')));

    component.queryStringFieldId = '';
    component.controlName.setValue(TestDataFields[0].Name);
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should trigger error handling when sending a call to the field service when updating an field and the request fails', () => {
    fieldServiceSpy.update.and.returnValue(throwError(() => new Error('ERROR')));

    component.queryStringFieldId = TestDataShops[0].Id;
    component.controlName.setValue(TestDataFields[0].Name);
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });
});