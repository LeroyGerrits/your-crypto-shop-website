import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelDashboardComponent } from './dashboard.component';

describe('ControlPanelDashboardComponent', () => {
  let component: ControlPanelDashboardComponent;
  let fixture: ComponentFixture<ControlPanelDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlPanelDashboardComponent]
    });
    fixture = TestBed.createComponent(ControlPanelDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
