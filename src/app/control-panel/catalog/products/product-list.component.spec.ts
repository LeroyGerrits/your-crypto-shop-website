import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelCatalogProductListComponent } from './product-list.component';

describe('ControlPanelCatalogProductListComponent', () => {
  let component: ControlPanelCatalogProductListComponent;
  let fixture: ComponentFixture<ControlPanelCatalogProductListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlPanelCatalogProductListComponent]
    });
    fixture = TestBed.createComponent(ControlPanelCatalogProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
