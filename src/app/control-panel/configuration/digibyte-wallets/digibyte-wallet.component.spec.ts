import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelConfigurationDigiByteWalletComponent } from './digibyte-wallet.component';

describe('ControlPanelConfigurationDigiByteWalletComponent', () => {
  let component: ControlPanelConfigurationDigiByteWalletComponent;
  let fixture: ComponentFixture<ControlPanelConfigurationDigiByteWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlPanelConfigurationDigiByteWalletComponent]
    });
    fixture = TestBed.createComponent(ControlPanelConfigurationDigiByteWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});