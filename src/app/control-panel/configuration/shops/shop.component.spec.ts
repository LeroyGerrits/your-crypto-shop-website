import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlPanelConfigurationShopComponent } from './shop.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ShopService } from 'src/app/shared/services/Shop.service';

describe('ControlPanelConfigurationShopComponent', () => {
  let component: ControlPanelConfigurationShopComponent;
  let fixture: ComponentFixture<ControlPanelConfigurationShopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlPanelConfigurationShopComponent],
      imports: [BrowserAnimationsModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterTestingModule],
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
        HttpClient,
        HttpHandler,
        ShopService
      ]
    });
    fixture = TestBed.createComponent(ControlPanelConfigurationShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});