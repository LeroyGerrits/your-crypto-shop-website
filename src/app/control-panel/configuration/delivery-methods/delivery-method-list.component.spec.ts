import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlPanelConfigurationDeliveryMethodListComponent } from './delivery-method-list.component';
import { DeliveryMethodService } from 'src/app/shared/services/DeliveryMethod.service';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ShopService } from 'src/app/shared/services/Shop.service';
import { Sort } from '@angular/material/sort';
import { TestDataDeliveryMethods } from 'src/assets/test-data/DeliveryMethods';
import { TestDataShops } from 'src/assets/test-data/Shops';

describe('ControlPanelConfigurationDeliveryMethodListComponent', () => {
  let component: ControlPanelConfigurationDeliveryMethodListComponent;
  let fixture: ComponentFixture<ControlPanelConfigurationDeliveryMethodListComponent>;

  let matDialogRefSpy: any;
  let matDialogSpy: jasmine.SpyObj<MatDialog>
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let deliveryMethodServiceSpy: jasmine.SpyObj<DeliveryMethodService>;
  let shopServiceSpy: jasmine.SpyObj<ShopService>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogRefSpy.componentInstance = { title: '', message: '' };
    matDialogRefSpy.afterClosed = () => of(true);

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogSpy.open.and.returnValue(matDialogRefSpy);

    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    deliveryMethodServiceSpy = jasmine.createSpyObj('DeliveryMethodService', ['getList', 'delete']);
    deliveryMethodServiceSpy.getList.and.returnValue(of(TestDataDeliveryMethods));
    deliveryMethodServiceSpy.delete.and.returnValue(of(mutationResult));

    shopServiceSpy = jasmine.createSpyObj('ShopService', ['getList']);
    shopServiceSpy.getList.and.returnValue(of(TestDataShops));

    TestBed.configureTestingModule({
      declarations: [ControlPanelConfigurationDeliveryMethodListComponent],
      imports: [BrowserAnimationsModule, MatIconModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatTableModule, ReactiveFormsModule, RouterLink, RouterLink, RouterTestingModule.withRoutes(
        [{ path: 'control-panel/configuration/delivery-methods', component: ControlPanelConfigurationDeliveryMethodListComponent }]
      )],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { data: {} } } },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: ShopService, useValue: shopServiceSpy },
        { provide: DeliveryMethodService, useValue: deliveryMethodServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        HttpClient,
        HttpHandler,
        Router
      ]
    });
    fixture = TestBed.createComponent(ControlPanelConfigurationDeliveryMethodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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

    component.editElement(TestDataDeliveryMethods[0]);
    expect(routerstub.navigate).toHaveBeenCalledWith(['/control-panel/configuration/delivery-methods/' + TestDataDeliveryMethods[0].Id]);
  });

  it('should show a dialog when delete icon is clicked', () => {
    component.deleteElement(TestDataDeliveryMethods[0]);
    expect(matDialogSpy.open).toHaveBeenCalled();
  });

  it('should navigate when handling submit result and no error code is applicable', () => {
    const mutationResult = <MutationResult>{ Constraint: '', ErrorCode: 0, Identity: '', Message: '' };
    const routerstub: Router = TestBed.inject(Router);
    spyOn(routerstub, 'navigate');

    component.handleOnSubmitResult(mutationResult);
    expect(routerstub.navigate).toHaveBeenCalledWith(['/control-panel/configuration/delivery-methods']);
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
});

describe('ControlPanelConfigurationDeliveryMethodListComponentWithErrors', () => {
  let component: ControlPanelConfigurationDeliveryMethodListComponent;
  let fixture: ComponentFixture<ControlPanelConfigurationDeliveryMethodListComponent>;

  let matDialogRefSpy: any;
  let matDialogSpy: jasmine.SpyObj<MatDialog>
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let deliveryMethodServiceSpy: jasmine.SpyObj<DeliveryMethodService>;
  let shopServiceSpy: jasmine.SpyObj<ShopService>;

  beforeEach(() => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogRefSpy.componentInstance = { title: '', message: '' };
    matDialogRefSpy.afterClosed = () => of(true);

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogSpy.open.and.returnValue(matDialogRefSpy);

    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    deliveryMethodServiceSpy = jasmine.createSpyObj('DeliveryMethodService', ['getList', 'delete']);
    deliveryMethodServiceSpy.getList.and.returnValue(of(TestDataDeliveryMethods));
    deliveryMethodServiceSpy.delete.and.returnValue(throwError(() => new Error('ERROR')));

    shopServiceSpy = jasmine.createSpyObj('ShopService', ['getList']);
    shopServiceSpy.getList.and.returnValue(of(TestDataShops));

    TestBed.configureTestingModule({
      declarations: [ControlPanelConfigurationDeliveryMethodListComponent],
      imports: [BrowserAnimationsModule, MatIconModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatTableModule, ReactiveFormsModule, RouterLink, RouterLink, RouterTestingModule.withRoutes(
        [{ path: 'control-panel/configuration/delivery-methods', component: ControlPanelConfigurationDeliveryMethodListComponent }]
      )],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { data: {} } } },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: ShopService, useValue: shopServiceSpy },
        { provide: DeliveryMethodService, useValue: deliveryMethodServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        HttpClient,
        HttpHandler,
        Router
      ]
    });
    fixture = TestBed.createComponent(ControlPanelConfigurationDeliveryMethodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.deleteElement(TestDataDeliveryMethods[0]);
    expect(component).toBeTruthy();
  });
});