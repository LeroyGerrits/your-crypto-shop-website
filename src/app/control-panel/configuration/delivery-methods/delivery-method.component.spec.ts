import { ActivatedRoute, RouterLink } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlPanelConfigurationDeliveryMethodComponent } from './delivery-method.component';
import { DeliveryMethodService } from 'src/app/shared/services/DeliveryMethod.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { ShopService } from 'src/app/shared/services/Shop.service';

describe('ControlPanelConfigurationDeliveryMethodComponent', () => {
  let component: ControlPanelConfigurationDeliveryMethodComponent;
  let fixture: ComponentFixture<ControlPanelConfigurationDeliveryMethodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlPanelConfigurationDeliveryMethodComponent],
      imports: [BrowserAnimationsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, RouterLink],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: {
                get: () => 0,
              },
            },
          }
        },
        DeliveryMethodService,
        HttpClient,
        HttpHandler,
        MatSnackBar,
        ShopService
      ]
    });
    fixture = TestBed.createComponent(ControlPanelConfigurationDeliveryMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});