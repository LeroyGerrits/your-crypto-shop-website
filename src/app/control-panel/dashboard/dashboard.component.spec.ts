import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelDashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ControlPanelDashboardComponent', () => {
  let component: ControlPanelDashboardComponent;
  let fixture: ComponentFixture<ControlPanelDashboardComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ControlPanelDashboardComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(ControlPanelDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});