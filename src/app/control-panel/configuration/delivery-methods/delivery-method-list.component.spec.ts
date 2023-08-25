import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlPanelConfigurationDeliveryMethodListComponent } from './delivery-method-list.component';
import { DeliveryMethodService } from 'src/app/shared/services/DeliveryMethod.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { ReactiveFormsModule } from '@angular/forms';
import { ShopService } from 'src/app/shared/services/Shop.service';
import { Sort } from '@angular/material/sort';
import { TestDataDeliveryMethods } from 'src/assets/test-data/DeliveryMethods';
import { TestDataShops } from 'src/assets/test-data/Shops';
import { of } from 'rxjs';

describe('ControlPanelConfigurationDeliveryMethodListComponent', () => {
  let component: ControlPanelConfigurationDeliveryMethodListComponent;
  let fixture: ComponentFixture<ControlPanelConfigurationDeliveryMethodListComponent>;

  let matDialogRefSpy: any;
  let matDialogSpy: jasmine.SpyObj<MatDialog>
  let deliveryMethodServiceSpy: jasmine.SpyObj<DeliveryMethodService>;
  let shopServiceSpy: jasmine.SpyObj<ShopService>;
  let mutationResult: MutationResult = { ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {    
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogRefSpy.componentInstance = {title: '', message: ''};
    matDialogRefSpy.afterClosed = () => of(true);

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogSpy.open.and.returnValue(matDialogRefSpy);
    
    deliveryMethodServiceSpy = jasmine.createSpyObj('DeliveryMethodService', ['getList', 'delete']);
    deliveryMethodServiceSpy.getList.and.returnValue(of(TestDataDeliveryMethods));
    deliveryMethodServiceSpy.delete.and.returnValue(of(mutationResult));
    shopServiceSpy = jasmine.createSpyObj('ShopService', ['getList']);
    shopServiceSpy.getList.and.returnValue(of(TestDataShops));

    TestBed.configureTestingModule({
      declarations: [ControlPanelConfigurationDeliveryMethodListComponent],
      imports: [BrowserAnimationsModule, MatDialogModule, MatIconModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatTableModule, ReactiveFormsModule, RouterLink],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { data: {} } } },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: ShopService, useValue: shopServiceSpy },
        { provide: DeliveryMethodService, useVaue: deliveryMethodServiceSpy },
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
  });

  it('should clear the sortState when no sort direction is supplied', () => {
    const routerstub: Router = TestBed.inject(Router);
    spyOn(routerstub, 'navigate');

    const fakeSortEvent: Sort = { active: 'fakeActive', direction: '' };
    component.onSortChange(fakeSortEvent);
  });

  it('should go to edit page when edit icon is clicked', () => {
    const routerstub: Router = TestBed.inject(Router);
    spyOn(routerstub, 'navigate');

    component.editElement(TestDataDeliveryMethods[0]);
    expect(routerstub.navigate).toHaveBeenCalledWith(['/control-panel/configuration/delivery-methods/' + TestDataDeliveryMethods[0].Id]);
  });

  it('should delete a delivery method when delete icon is clicked and dialog is confirmed', () => {
    component.deleteElement(TestDataDeliveryMethods[0]);
    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(matDialogRefSpy.close).toHaveBeenCalled();
  });
});