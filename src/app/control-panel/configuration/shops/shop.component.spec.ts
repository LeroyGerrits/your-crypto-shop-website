import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelConfigurationShopComponent } from './shop.component';

describe('ControlPanelConfigurationShopComponent', () => {
  let component: ControlPanelConfigurationShopComponent;
  let fixture: ComponentFixture<ControlPanelConfigurationShopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlPanelConfigurationShopComponent]
    });
    fixture = TestBed.createComponent(ControlPanelConfigurationShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});