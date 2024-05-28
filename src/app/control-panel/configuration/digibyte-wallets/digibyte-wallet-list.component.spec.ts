import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

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
import { of, throwError } from 'rxjs';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { DigiByteWalletService } from 'src/app/shared/services/digibyte-wallet.service';
import { TestDataDigiByteWallets } from 'src/assets/test-data/DigiByteWallets';
import { ControlPanelConfigurationDigiByteWalletListComponent } from './digibyte-wallet-list.component';

describe('ControlPanelConfigurationDigiByteWalletListComponent', () => {
  let component: ControlPanelConfigurationDigiByteWalletListComponent;
  let fixture: ComponentFixture<ControlPanelConfigurationDigiByteWalletListComponent>;

  let matDialogRefSpy: any;
  let matDialogSpy: jasmine.SpyObj<MatDialog>
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  let digiByteWalletServiceSpy: jasmine.SpyObj<DigiByteWalletService>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogRefSpy.componentInstance = { title: '', message: '' };
    matDialogRefSpy.afterClosed = () => of(true);

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogSpy.open.and.returnValue(matDialogRefSpy);

    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    digiByteWalletServiceSpy = jasmine.createSpyObj('DigiByteWalletService', ['getList', 'delete']);
    digiByteWalletServiceSpy.getList.and.returnValue(of(TestDataDigiByteWallets));
    digiByteWalletServiceSpy.delete.and.returnValue(of(mutationResult));

    TestBed.configureTestingModule({
      declarations: [ControlPanelConfigurationDigiByteWalletListComponent],
      imports: [BrowserAnimationsModule, MatIconModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, ReactiveFormsModule, RouterLink, RouterTestingModule.withRoutes(
        [{ path: 'control-panel/configuration/digibyte-wallets', component: ControlPanelConfigurationDigiByteWalletListComponent }]
      )],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { data: {} } } },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: DigiByteWalletService, useValue: digiByteWalletServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        ControlPanelConfigurationDigiByteWalletListComponent,
        Router
      ]
    });
    fixture = TestBed.createComponent(ControlPanelConfigurationDigiByteWalletListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should filter digibyte wallets list when name filter gets used', fakeAsync(() => {
    const componentStub: ControlPanelConfigurationDigiByteWalletListComponent = TestBed.inject(ControlPanelConfigurationDigiByteWalletListComponent);
    spyOn(componentStub, 'filterDigiByteWallets');
    componentStub.controlFilterName.setValue('test');
    tick(1000);
    expect(componentStub.filterDigiByteWallets).toHaveBeenCalled();
  }));

  it('should filter digibyte wallets list when shop filter gets used', fakeAsync(() => {
    const componentStub: ControlPanelConfigurationDigiByteWalletListComponent = TestBed.inject(ControlPanelConfigurationDigiByteWalletListComponent);
    spyOn(componentStub, 'filterDigiByteWallets');
    componentStub.controlFilterAddress.setValue('test');
    tick(1000);
    expect(componentStub.filterDigiByteWallets).toHaveBeenCalled();
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

    component.editElement(TestDataDigiByteWallets[0]);
    expect(routerstub.navigate).toHaveBeenCalledWith(['/control-panel/configuration/digibyte-wallets/' + TestDataDigiByteWallets[0].Id]);
  });

  it('should show a dialog when delete icon is clicked', () => {
    component.deleteElement(TestDataDigiByteWallets[0]);
    expect(matDialogSpy.open).toHaveBeenCalled();
  });

  it('should reload when handling submit result and no error code is applicable', () => {
    const componentStub: ControlPanelConfigurationDigiByteWalletListComponent = TestBed.inject(ControlPanelConfigurationDigiByteWalletListComponent);
    spyOn(componentStub, 'filterDigiByteWallets');

    const mutationResult = <MutationResult>{ Constraint: '', ErrorCode: 0, Identity: '', Message: '', Success: true };
    componentStub.handleOnSubmitResult(mutationResult);
    expect(componentStub.filterDigiByteWallets).toHaveBeenCalled();
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

  it('should trigger error handling when sending a call to the DigiByte wallet service when deleting a DigiByte wallet and the request fails', () => {
    digiByteWalletServiceSpy.delete.and.returnValue(throwError(() => new Error('ERROR')));
    component.deleteElement(TestDataDigiByteWallets[0]);
    expect(component).toBeTruthy();
  });
});