import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlPanelConfigurationDigiByteWalletListComponent } from './digibyte-wallet-list.component';
import { DigiByteWalletService } from 'src/app/shared/services/DigiByteWallet.service';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { RouterTestingModule } from '@angular/router/testing';
import { Sort } from '@angular/material/sort';
import { TestDataDigiByteWallets } from 'src/assets/test-data/DigiByteWallets';
import { of } from 'rxjs';

describe('ControlPanelConfigurationDigiByteWalletListComponent', () => {
  let component: ControlPanelConfigurationDigiByteWalletListComponent;
  let fixture: ComponentFixture<ControlPanelConfigurationDigiByteWalletListComponent>;

  let matDialogRefSpy: any;
  let matDialogSpy: jasmine.SpyObj<MatDialog>
  let digiByteWalletServiceSpy: jasmine.SpyObj<DigiByteWalletService>;
  let mutationResult: MutationResult = <MutationResult>{ ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogRefSpy.componentInstance = { title: '', message: '' };
    matDialogRefSpy.afterClosed = () => of(true);

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogSpy.open.and.returnValue(matDialogRefSpy);

    digiByteWalletServiceSpy = jasmine.createSpyObj('DigiByteWalletService', ['getList', 'delete']);
    digiByteWalletServiceSpy.getList.and.returnValue(of(TestDataDigiByteWallets));
    digiByteWalletServiceSpy.delete.and.returnValue(of(mutationResult));

    TestBed.configureTestingModule({
      declarations: [ControlPanelConfigurationDigiByteWalletListComponent],
      imports: [BrowserAnimationsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatTableModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { data: {} } } },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: DigiByteWalletService, useValue: digiByteWalletServiceSpy },
        HttpClient,
        HttpHandler,
        Router
      ]
    });
    fixture = TestBed.createComponent(ControlPanelConfigurationDigiByteWalletListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

    component.editElement(TestDataDigiByteWallets[0]);
    expect(routerstub.navigate).toHaveBeenCalledWith(['/control-panel/configuration/digibyte-wallets/' + TestDataDigiByteWallets[0].Id]);
  });

  it('should delete a DigiByte wallet when delete icon is clicked and dialog is confirmed', () => {
    component.deleteElement(TestDataDigiByteWallets[0]);
    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(matDialogRefSpy.close).toHaveBeenCalled();
  });
});