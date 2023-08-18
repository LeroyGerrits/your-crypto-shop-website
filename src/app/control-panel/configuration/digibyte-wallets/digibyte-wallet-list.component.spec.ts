import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlPanelConfigurationDigiByteWalletListComponent } from './digibyte-wallet-list.component';
import { DigiByteWalletService } from 'src/app/shared/services/DigiByteWallet.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';

describe('ControlPanelConfigurationDigiByteWalletListComponent', () => {
  let component: ControlPanelConfigurationDigiByteWalletListComponent;
  let fixture: ComponentFixture<ControlPanelConfigurationDigiByteWalletListComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlPanelConfigurationDigiByteWalletListComponent],
      imports: [BrowserAnimationsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatTableModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        DigiByteWalletService, 
        HttpClient, 
        HttpHandler
      ]
    });
    fixture = TestBed.createComponent(ControlPanelConfigurationDigiByteWalletListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});