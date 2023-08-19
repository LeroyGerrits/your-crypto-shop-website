import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelCatalogCategoryListComponent } from './category-list.component';

describe('ControlPanelCatalogCategoryListComponent', () => {
  let component: ControlPanelCatalogCategoryListComponent;
  let fixture: ComponentFixture<ControlPanelCatalogCategoryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlPanelCatalogCategoryListComponent]
    });
    fixture = TestBed.createComponent(ControlPanelCatalogCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});