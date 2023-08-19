import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelCatalogProductComponent } from './product.component';

describe('ControlPanelCatalogProductComponent', () => {
  let component: ControlPanelCatalogProductComponent;
  let fixture: ComponentFixture<ControlPanelCatalogProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlPanelCatalogProductComponent]
    });
    fixture = TestBed.createComponent(ControlPanelCatalogProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});