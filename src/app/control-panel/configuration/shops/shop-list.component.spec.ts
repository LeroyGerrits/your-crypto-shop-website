import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { of, throwError } from 'rxjs';

import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { ShopService } from 'src/app/shared/services/shop.service';
import { TestDataShops } from 'src/assets/test-data/-shops';
import { ControlPanelConfigurationShopListComponent } from './shop-list.component';
import { CountryService } from 'src/app/shared/services/country.service';
import { ShopCategoryService } from 'src/app/shared/services/shop-category.service';
import { TestDataCountries } from 'src/assets/test-data/Countries';
import { TestDataShopCategories } from 'src/assets/test-data/shop-categories';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';

describe('ControlPanelConfigurationShopListComponent', () => {
  let component: ControlPanelConfigurationShopListComponent;
  let fixture: ComponentFixture<ControlPanelConfigurationShopListComponent>;

  let matDialogRefSpy: any;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let countryServiceSpy: jasmine.SpyObj<CountryService>;
  let shopServiceSpy: jasmine.SpyObj<ShopService>;
  let shopCategoryServiceSpy: jasmine.SpyObj<ShopCategoryService>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogRefSpy.componentInstance = { title: '', message: '' };
    matDialogRefSpy.afterClosed = () => of(true);

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogSpy.open.and.returnValue(matDialogRefSpy);

    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    countryServiceSpy = jasmine.createSpyObj('CountryService', ['getList']);
    countryServiceSpy.getList.and.returnValue(of(TestDataCountries));

    shopCategoryServiceSpy = jasmine.createSpyObj('ShopCategoryService', ['getList']);
    shopCategoryServiceSpy.getList.and.returnValue(of(TestDataShopCategories));

    shopServiceSpy = jasmine.createSpyObj('ShopService', ['getList', 'delete']);
    shopServiceSpy.getList.and.returnValue(of(TestDataShops));
    shopServiceSpy.delete.and.returnValue(of(mutationResult));

    TestBed.configureTestingModule({
      declarations: [ControlPanelConfigurationShopListComponent],
      imports: [BrowserAnimationsModule, MatExpansionModule, MatIconModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatTableModule, ReactiveFormsModule, RouterLink, RouterTestingModule.withRoutes(
        [{ path: 'control-panel/configuration/shops', component: ControlPanelConfigurationShopListComponent }]
      )],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { data: {} } } },
        { provide: CountryService, useValue: countryServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: ShopService, useValue: shopServiceSpy },
        { provide: ShopCategoryService, useValue: shopCategoryServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        ControlPanelConfigurationShopListComponent,
        Router
      ]
    });
    fixture = TestBed.createComponent(ControlPanelConfigurationShopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should filter shops list when name filter gets used', fakeAsync(() => {
    const componentStub: ControlPanelConfigurationShopListComponent = TestBed.inject(ControlPanelConfigurationShopListComponent);
    spyOn(componentStub, 'filterShops');
    componentStub.controlFilterName.setValue('test');
    tick(1000);
    expect(componentStub.filterShops).toHaveBeenCalled();
  }));

  it('should filter shops list when subdomain filter gets used', fakeAsync(() => {
    const componentStub: ControlPanelConfigurationShopListComponent = TestBed.inject(ControlPanelConfigurationShopListComponent);
    spyOn(componentStub, 'filterShops');
    componentStub.controlFilterSubDomain.setValue('test');
    tick(1000);
    expect(componentStub.filterShops).toHaveBeenCalled();
  }));

  it('should filter shops list when country filter gets used', fakeAsync(() => {
    const componentStub: ControlPanelConfigurationShopListComponent = TestBed.inject(ControlPanelConfigurationShopListComponent);
    spyOn(componentStub, 'filterShops');
    componentStub.controlFilterCountry.setValue('test');
    tick(1000);
    expect(componentStub.filterShops).toHaveBeenCalled();
  }));

  it('should filter shops list when category filter gets used', fakeAsync(() => {
    const componentStub: ControlPanelConfigurationShopListComponent = TestBed.inject(ControlPanelConfigurationShopListComponent);
    spyOn(componentStub, 'filterShops');
    componentStub.controlFilterShopCategory.setValue('test');
    tick(1000);
    expect(componentStub.filterShops).toHaveBeenCalled();
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

    component.editElement(TestDataShops[0]);
    expect(routerstub.navigate).toHaveBeenCalledWith(['/control-panel/configuration/shops/' + TestDataShops[0].Id]);
  });

  it('should show a dialog when delete icon is clicked', () => {
    component.deleteElement(TestDataShops[0]);
    expect(matDialogSpy.open).toHaveBeenCalled();
  });

  it('should reload when handling submit result and no error code is applicable', () => {
    const componentStub: ControlPanelConfigurationShopListComponent = TestBed.inject(ControlPanelConfigurationShopListComponent);
    spyOn(componentStub, 'filterShops');

    const mutationResult = <MutationResult>{ Constraint: '', ErrorCode: 0, Identity: '', Message: '', Success: true };
    componentStub.handleOnSubmitResult(mutationResult);
    expect(componentStub.filterShops).toHaveBeenCalled();
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

  it('should trigger error handling when sending a call to the shop service when deleting a shop and the request fails', () => {
    shopServiceSpy.delete.and.returnValue(throwError(() => new Error('ERROR')));
    component.deleteElement(TestDataShops[0]);
    expect(component).toBeTruthy();
  });
});