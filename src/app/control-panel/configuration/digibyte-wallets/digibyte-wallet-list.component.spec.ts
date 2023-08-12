import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelConfigurationDigiByteWalletListComponent } from './digibyte-wallet-list.component';

describe('ControlPanelConfigurationDigiByteWalletListComponent', () => {
  let component: ControlPanelConfigurationDigiByteWalletListComponent;
  let fixture: ComponentFixture<ControlPanelConfigurationDigiByteWalletListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlPanelConfigurationDigiByteWalletListComponent]
    });
    fixture = TestBed.createComponent(ControlPanelConfigurationDigiByteWalletListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});