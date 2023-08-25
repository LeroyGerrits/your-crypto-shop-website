import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlPanelConfigurationShopListComponent } from './shop-list.component';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { ShopService } from 'src/app/shared/services/Shop.service';
import { Sort } from '@angular/material/sort';
import { TestDataShops } from 'src/assets/test-data/Shops';
import { of } from 'rxjs';

describe('ControlPanelConfigurationShopListComponent', () => {
  let component: ControlPanelConfigurationShopListComponent;
  let fixture: ComponentFixture<ControlPanelConfigurationShopListComponent>;

  let matDialogRefSpy: any;
  let matDialogSpy: jasmine.SpyObj<MatDialog>
  let shopServiceSpy: jasmine.SpyObj<ShopService>;
  let mutationResult: MutationResult = { ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogRefSpy.componentInstance = {title: '', message: ''};
    matDialogRefSpy.afterClosed = () => of(true);

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogSpy.open.and.returnValue(matDialogRefSpy);
    
    shopServiceSpy = jasmine.createSpyObj('ShopService', ['getList', 'delete']);
    shopServiceSpy.getList.and.returnValue(of(TestDataShops));
    shopServiceSpy.delete.and.returnValue(of(mutationResult));

    TestBed.configureTestingModule({
      declarations: [ControlPanelConfigurationShopListComponent],
      imports: [BrowserAnimationsModule, MatIconModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, RouterLink],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { data: {} } } },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: ShopService, useValue: shopServiceSpy },
        HttpClient,
        HttpHandler,
        Router
      ]
    });
    fixture = TestBed.createComponent(ControlPanelConfigurationShopListComponent);
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

    component.editElement(TestDataShops[0]);
    expect(routerstub.navigate).toHaveBeenCalledWith(['/control-panel/configuration/shops/' + TestDataShops[0].Id]);
  });

  it('should delete a delivery method when delete icon is clicked and dialog is confirmed', () => {
    component.deleteElement(TestDataShops[0]);
    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(matDialogRefSpy.close).toHaveBeenCalled();
  });
});