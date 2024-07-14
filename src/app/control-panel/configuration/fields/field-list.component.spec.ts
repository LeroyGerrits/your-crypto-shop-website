import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { of, throwError } from 'rxjs';

import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { DeliveryMethodService } from 'src/app/shared/services/delivery-method.service';
import { ShopService } from 'src/app/shared/services/shop.service';
import { TestDataDeliveryMethods } from 'src/assets/test-data/DeliveryMethods';
import { TestDataShops } from 'src/assets/test-data/-shops';
import { ControlPanelConfigurationFieldListComponent } from './field-list.component';
import { TestDataFields } from 'src/assets/test-data/Fields';
import { FieldService } from 'src/app/shared/services/field.service';
import { MatExpansionModule } from '@angular/material/expansion';

describe('ControlPanelConfigurationFieldListComponent', () => {
  let component: ControlPanelConfigurationFieldListComponent;
  let fixture: ComponentFixture<ControlPanelConfigurationFieldListComponent>;

  let matDialogRefSpy: any;
  let matDialogSpy: jasmine.SpyObj<MatDialog>
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let fieldServiceSpy: jasmine.SpyObj<FieldService>;
  let shopServiceSpy: jasmine.SpyObj<ShopService>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogRefSpy.componentInstance = { title: '', message: '' };
    matDialogRefSpy.afterClosed = () => of(true);

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogSpy.open.and.returnValue(matDialogRefSpy);

    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    fieldServiceSpy = jasmine.createSpyObj('FieldService', ['getList', 'delete']);
    fieldServiceSpy.getList.and.returnValue(of(TestDataFields));
    fieldServiceSpy.delete.and.returnValue(of(mutationResult));

    shopServiceSpy = jasmine.createSpyObj('ShopService', ['getList']);
    shopServiceSpy.getList.and.returnValue(of(TestDataShops));

    TestBed.configureTestingModule({
      declarations: [ControlPanelConfigurationFieldListComponent],
      imports: [BrowserAnimationsModule, MatExpansionModule, MatIconModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatTableModule, ReactiveFormsModule, RouterLink, RouterTestingModule.withRoutes(
        [{ path: 'control-panel/configuration/fields', component: ControlPanelConfigurationFieldListComponent }]
      )],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { data: {} } } },
        { provide: FieldService, useValue: fieldServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        { provide: ShopService, useValue: shopServiceSpy },                
        ControlPanelConfigurationFieldListComponent,
        Router
      ]
    });
    fixture = TestBed.createComponent(ControlPanelConfigurationFieldListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should filter delivery methods list when name filter gets used', fakeAsync(() => {
    const componentStub: ControlPanelConfigurationFieldListComponent = TestBed.inject(ControlPanelConfigurationFieldListComponent);
    spyOn(componentStub, 'filterFields');
    componentStub.controlFilterName.setValue('test');
    tick(1000);
    expect(componentStub.filterFields).toHaveBeenCalled();
  }));

  it('should filter delivery methods list when shop filter gets used', fakeAsync(() => {
    const componentStub: ControlPanelConfigurationFieldListComponent = TestBed.inject(ControlPanelConfigurationFieldListComponent);
    spyOn(componentStub, 'filterFields');
    componentStub.controlFilterShop.setValue('test');
    tick(1000);
    expect(componentStub.filterFields).toHaveBeenCalled();
  }));

  it('should edit the sortState when a sort direction is supplied', () => {
    const routerstub: Router = TestBed.inject(Router);
    spyOn(routerstub, 'navigate');

    const fakeSortEvent: Sort = { active: 'fakeActive', direction: 'asc' };
    component.onSortChange(fakeSortEvent);
    expect(component.sortDirection).toBe('asc');
  });

  it('should clear the sortState when no sort direction is supplied', () => {
    const routerstub: Router = TestBed.inject(Router);
    spyOn(routerstub, 'navigate');

    const fakeSortEvent: Sort = { active: 'fakeActive', direction: '' };
    component.onSortChange(fakeSortEvent);
    expect(component.sortDirection).toBeNull();
  });

  it('should go to edit page when edit icon is clicked', () => {
    const routerstub: Router = TestBed.inject(Router);
    spyOn(routerstub, 'navigate');

    component.editElement(TestDataFields[0]);
    expect(routerstub.navigate).toHaveBeenCalledWith(['/control-panel/configuration/fields/' + TestDataDeliveryMethods[0].Id]);
  });

  it('should show a dialog when delete icon is clicked', () => {
    component.deleteElement(TestDataFields[0]);
    expect(matDialogSpy.open).toHaveBeenCalled();
  });

  it('should reload when handling submit result and no error code is applicable', () => {
    const componentStub: ControlPanelConfigurationFieldListComponent = TestBed.inject(ControlPanelConfigurationFieldListComponent);
    spyOn(componentStub, 'filterFields');

    const mutationResult = <MutationResult>{ Constraint: '', ErrorCode: 0, Identity: '', Message: '', Success: true };
    componentStub.handleOnSubmitResult(mutationResult);
    expect(componentStub.filterFields).toHaveBeenCalled();
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

  it('should trigger error handling when sending a call to the delivery method service when deleting a delivery method and the request fails', () => {
    fieldServiceSpy.delete.and.returnValue(throwError(() => new Error('ERROR')));
    component.deleteElement(TestDataFields[0]);
    expect(component).toBeTruthy();
  });
});