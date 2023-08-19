import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelCatalogCategoryComponent } from './category.component';

describe('ControlPanelCatalogCategoryComponent', () => {
  let component: ControlPanelCatalogCategoryComponent;
  let fixture: ComponentFixture<ControlPanelCatalogCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlPanelCatalogCategoryComponent]
    });
    fixture = TestBed.createComponent(ControlPanelCatalogCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});