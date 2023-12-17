import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlPanelCustomerListComponent } from './customer-list.component';
import { CustomerService } from 'src/app/shared/services/Customer.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ShopService } from 'src/app/shared/services/Shop.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { TestDataCustomers } from 'src/assets/test-data/Customers';
import { of, throwError } from 'rxjs';
import { TestDataShops } from 'src/assets/test-data/Shops';
import { Sort } from '@angular/material/sort';
import { Shop } from 'src/app/shared/models/Shop.model';

describe('ControlPanelCustomerListComponent', () => {
  let component: ControlPanelCustomerListComponent;
  let fixture: ComponentFixture<ControlPanelCustomerListComponent>;

  let matDialogRefSpy: any;
  let matDialogSpy: jasmine.SpyObj<MatDialog>
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let customerServiceSpy: jasmine.SpyObj<CustomerService>;
  let shopServiceSpy: jasmine.SpyObj<ShopService>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogRefSpy.componentInstance = { title: '', message: '' };
    matDialogRefSpy.afterClosed = () => of(true);

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogSpy.open.and.returnValue(matDialogRefSpy);

    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    customerServiceSpy = jasmine.createSpyObj('ProductService', ['getList', 'delete']);
    customerServiceSpy.getList.and.returnValue(of(TestDataCustomers));
    customerServiceSpy.delete.and.returnValue(of(mutationResult));

    shopServiceSpy = jasmine.createSpyObj('ShopService', ['getList']);
    shopServiceSpy.getList.and.returnValue(of(TestDataShops));

    TestBed.configureTestingModule({
      declarations: [ControlPanelCustomerListComponent],
      imports: [BrowserAnimationsModule, HttpClientTestingModule, MatIconModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatTableModule, ReactiveFormsModule, RouterLink, RouterTestingModule.withRoutes(
        [{ path: 'control-panel/customers', component: ControlPanelCustomerListComponent }]
      )],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { data: {} } } },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: ShopService, useValue: shopServiceSpy },
        { provide: CustomerService, useValue: customerServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        ControlPanelCustomerListComponent,
        Router
      ]
    });
    fixture = TestBed.createComponent(ControlPanelCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should filter customers list when username filter gets used', fakeAsync(() => {
    const componentStub: ControlPanelCustomerListComponent = TestBed.inject(ControlPanelCustomerListComponent);
    spyOn(componentStub, 'filterCustomers');
    componentStub.controlFilterUsername.setValue('test');
    tick(1000);
    expect(componentStub.filterCustomers).toHaveBeenCalled();
  }));

  it('should filter customers list when e-mail address filter gets used', fakeAsync(() => {
    const componentStub: ControlPanelCustomerListComponent = TestBed.inject(ControlPanelCustomerListComponent);
    spyOn(componentStub, 'filterCustomers');
    componentStub.controlFilterEmailAddress.setValue('test');
    tick(1000);
    expect(componentStub.filterCustomers).toHaveBeenCalled();
  }));

  it('should filter customers list when first name filter gets used', fakeAsync(() => {
    const componentStub: ControlPanelCustomerListComponent = TestBed.inject(ControlPanelCustomerListComponent);
    spyOn(componentStub, 'filterCustomers');
    componentStub.controlFilterFirstName.setValue('test');
    tick(1000);
    expect(componentStub.filterCustomers).toHaveBeenCalled();
  }));

  it('should filter customers list when last name filter gets used', fakeAsync(() => {
    const componentStub: ControlPanelCustomerListComponent = TestBed.inject(ControlPanelCustomerListComponent);
    spyOn(componentStub, 'filterCustomers');
    componentStub.controlFilterLastName.setValue('test');
    tick(1000);
    expect(componentStub.filterCustomers).toHaveBeenCalled();
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

    component.editElement(TestDataCustomers[0]);
    expect(routerstub.navigate).toHaveBeenCalledWith([`/control-panel/customers/${TestDataCustomers[0].Id}/${TestDataCustomers[0].ShopId}`]);
  });

  it('should show a dialog when delete icon is clicked', () => {
    component.deleteElement(TestDataCustomers[0]);
    expect(matDialogSpy.open).toHaveBeenCalled();
  });

  it('should refresh when handling submit result and no error code is applicable', () => {
    spyOn(component, 'filterCustomers');
    const mutationResult = <MutationResult>{ Constraint: '', ErrorCode: 0, Identity: '', Message: '', Success: true };
    component.handleOnSubmitResult(mutationResult);
    expect(component.filterCustomers).toHaveBeenCalled();
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

  it('should trigger error handling when sending a call to the customer service when deleting a customer shop and the request fails', () => {
    customerServiceSpy.delete.and.returnValue(throwError(() => new Error('ERROR')));
    component.deleteElement(TestDataCustomers[0]);
    expect(component).toBeTruthy();
  });

  it('should not retrieve customers when there are no shops', () => {
    shopServiceSpy.getList.and.returnValue(of([]));
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});