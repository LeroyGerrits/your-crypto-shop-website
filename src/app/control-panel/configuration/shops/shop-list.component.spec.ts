import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelConfigurationShopListComponent } from './shop-list.component';

describe('ControlPanelConfigurationShopListComponent', () => {
  let component: ControlPanelConfigurationShopListComponent;
  let fixture: ComponentFixture<ControlPanelConfigurationShopListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlPanelConfigurationShopListComponent]
    });
    fixture = TestBed.createComponent(ControlPanelConfigurationShopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});