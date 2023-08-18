import { ActivatedRoute, RouterLink } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlPanelConfigurationDigiByteWalletComponent } from './digibyte-wallet.component';
import { DigiByteWalletService } from 'src/app/shared/services/DigiByteWallet.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';

describe('ControlPanelConfigurationDigiByteWalletComponent', () => {
  let component: ControlPanelConfigurationDigiByteWalletComponent;
  let fixture: ComponentFixture<ControlPanelConfigurationDigiByteWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlPanelConfigurationDigiByteWalletComponent],
      imports: [BrowserAnimationsModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterLink],
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
        DigiByteWalletService,
        HttpClient,
        HttpHandler,
        MatSnackBar
      ]
    });
    fixture = TestBed.createComponent(ControlPanelConfigurationDigiByteWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});