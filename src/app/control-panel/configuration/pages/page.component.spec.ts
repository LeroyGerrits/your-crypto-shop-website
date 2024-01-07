import { ActivatedRoute, Router, RouterLink, convertToParamMap } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelConfigurationPageComponent } from './page.component';
import { TestDataPages } from 'src/assets/test-data/Pages';
import { PageService } from 'src/app/shared/services/Page.service';
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

import { MatTabsModule } from '@angular/material/tabs';
import { CategoryService } from 'src/app/shared/services/Category.service';
import { TestDataCategories } from 'src/assets/test-data/Categories';
import { MatTreeModule } from '@angular/material/tree';
import { GetPageResponse } from 'src/app/shared/models/response/GetPageResponse.model';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { ControlPanelConfigurationPageListComponent } from './page-list.component';

describe('ControlPanelConfigurationPageComponent', () => {
  let component: ControlPanelConfigurationPageComponent;
  let fixture: ComponentFixture<ControlPanelConfigurationPageComponent>;

  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let pageServiceSpy: jasmine.SpyObj<PageService>;
  let shopServiceSpy: jasmine.SpyObj<ShopService>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getList']);
    categoryServiceSpy.getList.and.returnValue(of(TestDataCategories));

    pageServiceSpy = jasmine.createSpyObj('PageService', ['getById', 'create', 'update']);
    pageServiceSpy.getById.and.returnValue(of(<GetPageResponse>{ Page: TestDataPages[0], CategoryIds: [TestDataCategories[0].Id] }));
    pageServiceSpy.create.and.returnValue(of(mutationResult));
    pageServiceSpy.update.and.returnValue(of(mutationResult));

    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    shopServiceSpy = jasmine.createSpyObj('ShopService', ['getList']);
    shopServiceSpy.getList.and.returnValue(of(TestDataShops));

    TestBed.configureTestingModule({
      declarations: [ControlPanelConfigurationPageComponent],
      imports: [BrowserAnimationsModule, MatCheckboxModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTabsModule, MatTreeModule, ReactiveFormsModule, RouterLink, RouterTestingModule.withRoutes(
        [{ path: 'control-panel/catalog/pages', component: ControlPanelConfigurationPageListComponent }]
      )],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ pageId: TestDataPages[0].Id, shopId: TestDataPages[0].ShopId }) } } },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        { provide: PageService, useValue: pageServiceSpy },
        { provide: ShopService, useValue: shopServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(ControlPanelConfigurationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not proceed submitting when required form values are not filled in', () => {
    component.controlName.setValue('');
    component.onSubmit();
    expect(component.formSubmitted).toBeTrue();
    expect(component.formLoading).toBeFalse();
  });

  it('should send a call to the page service when creating a new page', () => {
    component.queryStringPageId = '';
    component.queryStringShopId = TestDataPages[0].ShopId;
    component.controlName.setValue(TestDataPages[0].Name);
    component.controlShop.setValue(TestDataPages[0].ShopId);
    component.controlPrice.setValue(TestDataPages[0].Price!.toString());
    component.controlDescription.setValue(TestDataPages[0].Description!);
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should send a call to the page service when updating an existing page', () => {
    component.queryStringPageId = TestDataPages[0].Id;
    component.queryStringShopId = TestDataPages[0].ShopId;
    component.controlName.setValue(TestDataPages[0].Name);
    component.controlShop.setValue(TestDataPages[0].ShopId);
    component.controlPrice.setValue(TestDataPages[0].Price!.toString());
    component.controlDescription.setValue(TestDataPages[0].Description!);
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should redirect when handling submit result and no errors are applicable', () => {
    const routerstub: Router = TestBed.inject(Router);
    spyOn(routerstub, 'navigate');

    const mutationResult = <MutationResult>{ Constraint: '', ErrorCode: 0, Identity: '', Message: '', Success: true };
    component.handleOnSubmitResult(mutationResult);
    expect(routerstub.navigate).toHaveBeenCalledWith(['/control-panel/catalog/pages']);
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

  it('should store a category in memory when it gets checked', () => {
    const fakeCheckboxChangeEvent = <MatCheckboxChange>{ checked: true };
    component.checkCategory(TestDataCategories[1], fakeCheckboxChangeEvent);
    expect(component.categoryIds.includes(TestDataCategories[1].Id)).toBeTrue();
  });

  it('should remove a category from memory when it gets unchecked', () => {
    const fakeCheckboxChangeEvent = <MatCheckboxChange>{ checked: false };
    component.checkCategory(TestDataCategories[0], fakeCheckboxChangeEvent);
    expect(component.categoryIds.includes(TestDataCategories[0].Id)).toBeFalse();
  });
});

describe('ControlPanelConfigurationPageComponentWithErrors', () => {
  let component: ControlPanelConfigurationPageComponent;
  let fixture: ComponentFixture<ControlPanelConfigurationPageComponent>;

  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let pageServiceSpy: jasmine.SpyObj<PageService>;
  let shopServiceSpy: jasmine.SpyObj<ShopService>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getList']);
    categoryServiceSpy.getList.and.returnValue(of(TestDataCategories));

    pageServiceSpy = jasmine.createSpyObj('PageService', ['getById', 'create', 'update']);
    pageServiceSpy.getById.and.returnValue(of(<GetPageResponse>{ Page: TestDataPages[0], CategoryIds: [''] }));
    pageServiceSpy.create.and.returnValue(throwError(() => new Error('ERROR')));
    pageServiceSpy.update.and.returnValue(throwError(() => new Error('ERROR')));

    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    shopServiceSpy = jasmine.createSpyObj('ShopService', ['getList']);
    shopServiceSpy.getList.and.returnValue(of(TestDataShops));

    TestBed.configureTestingModule({
      declarations: [ControlPanelConfigurationPageComponent],
      imports: [BrowserAnimationsModule, MatCheckboxModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTabsModule, MatTreeModule, ReactiveFormsModule, RouterLink, RouterTestingModule.withRoutes(
        [{ path: 'control-panel/catalog/pages', component: ControlPanelConfigurationPageListComponent }]
      )],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ pageId: 'new', shopId: TestDataPages[0].ShopId }) } } },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        { provide: PageService, useValue: pageServiceSpy },
        { provide: ShopService, useValue: shopServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(ControlPanelConfigurationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should trigger error handling when sending a call to the page service when creating a new page and the request fails', () => {
    component.queryStringPageId = '';
    component.queryStringShopId = TestDataPages[0].ShopId;
    component.controlName.setValue(TestDataPages[0].Name);
    component.controlShop.setValue(TestDataPages[0].ShopId);
    component.controlPrice.setValue(TestDataPages[0].Price!.toString());
    component.controlDescription.setValue(TestDataPages[0].Description!);
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });

  it('should trigger error handling when sending a call to the page service when updating an page shop and the request fails', () => {
    component.queryStringPageId = TestDataPages[0].Id;
    component.queryStringShopId = TestDataPages[0].ShopId;
    component.controlName.setValue(TestDataPages[0].Name);
    component.controlShop.setValue(TestDataPages[0].ShopId);
    component.controlPrice.setValue(TestDataPages[0].Price!.toString());
    component.controlDescription.setValue(TestDataPages[0].Description!);
    component.onSubmit();
    expect(component.formLoading).toBeFalse();
  });
});