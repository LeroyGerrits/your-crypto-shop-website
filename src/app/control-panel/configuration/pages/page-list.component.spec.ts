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
import { BooleanConvertPipe } from 'src/app/shared/pipes/boolean-convert.pipe';
import { PageService } from 'src/app/shared/services/page.service';
import { ShopService } from 'src/app/shared/services/shop.service';
import { TestDataPages } from 'src/assets/test-data/Pages';
import { TestDataShops } from 'src/assets/test-data/Shops';
import { ControlPanelConfigurationPageListComponent } from './page-list.component';
import { MatExpansionModule } from '@angular/material/expansion';

describe('ControlPanelConfigurationPageListComponent', () => {
  let component: ControlPanelConfigurationPageListComponent;
  let fixture: ComponentFixture<ControlPanelConfigurationPageListComponent>;

  let matDialogRefSpy: any;
  let matDialogSpy: jasmine.SpyObj<MatDialog>
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let pageServiceSpy: jasmine.SpyObj<PageService>;
  let shopServiceSpy: jasmine.SpyObj<ShopService>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogRefSpy.componentInstance = { title: '', message: '' };
    matDialogRefSpy.afterClosed = () => of(true);

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogSpy.open.and.returnValue(matDialogRefSpy);

    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    pageServiceSpy = jasmine.createSpyObj('PageService', ['getList', 'delete']);
    pageServiceSpy.getList.and.returnValue(of(TestDataPages));
    pageServiceSpy.delete.and.returnValue(of(mutationResult));

    shopServiceSpy = jasmine.createSpyObj('ShopService', ['getList']);
    shopServiceSpy.getList.and.returnValue(of(TestDataShops));

    TestBed.configureTestingModule({
      declarations: [ControlPanelConfigurationPageListComponent],
      imports: [BrowserAnimationsModule, MatExpansionModule, MatIconModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatTableModule, ReactiveFormsModule, RouterLink, RouterTestingModule.withRoutes(
        [{ path: 'control-panel/configuration/pages', component: ControlPanelConfigurationPageListComponent }]
      )],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { data: {} } } },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: ShopService, useValue: shopServiceSpy },
        { provide: PageService, useValue: pageServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        BooleanConvertPipe,
        ControlPanelConfigurationPageListComponent,
        Router
      ]
    });
    fixture = TestBed.createComponent(ControlPanelConfigurationPageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should filter pages list when title filter gets used', fakeAsync(() => {
    const componentStub: ControlPanelConfigurationPageListComponent = TestBed.inject(ControlPanelConfigurationPageListComponent);
    spyOn(componentStub, 'filterPages');
    componentStub.controlFilterTitle.setValue('test');
    tick(1000);
    expect(componentStub.filterPages).toHaveBeenCalled();
  }));

  it('should filter pages list when shop filter gets used', fakeAsync(() => {
    const componentStub: ControlPanelConfigurationPageListComponent = TestBed.inject(ControlPanelConfigurationPageListComponent);
    spyOn(componentStub, 'filterPages');
    componentStub.controlFilterShop.setValue('test');
    tick(1000);
    expect(componentStub.filterPages).toHaveBeenCalled();
  }));

  it('should filter pages list when visible filter gets used', fakeAsync(() => {
    const componentStub: ControlPanelConfigurationPageListComponent = TestBed.inject(ControlPanelConfigurationPageListComponent);
    spyOn(componentStub, 'filterPages');
    componentStub.controlFilterVisible.setValue('test');
    tick(1000);
    expect(componentStub.filterPages).toHaveBeenCalled();
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

    component.editElement(TestDataPages[0]);
    expect(routerstub.navigate).toHaveBeenCalledWith(['/control-panel/configuration/pages/' + TestDataPages[0].Id]);
  });

  it('should show a dialog when delete icon is clicked', () => {
    component.deleteElement(TestDataPages[0]);
    expect(matDialogSpy.open).toHaveBeenCalled();
  });

  it('should reload when handling submit result and no error code is applicable', () => {
    const componentStub: ControlPanelConfigurationPageListComponent = TestBed.inject(ControlPanelConfigurationPageListComponent);
    spyOn(componentStub, 'filterPages');

    const mutationResult = <MutationResult>{ Constraint: '', ErrorCode: 0, Identity: '', Message: '', Success: true };
    componentStub.handleOnSubmitResult(mutationResult);
    expect(componentStub.filterPages).toHaveBeenCalled();
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

  it('should trigger error handling when sending a call to the page service when deleting a page and the request fails', () => {
    pageServiceSpy.delete.and.returnValue(throwError(() => new Error('ERROR')));
    component.deleteElement(TestDataPages[0]);
    expect(component).toBeTruthy();
  });
});