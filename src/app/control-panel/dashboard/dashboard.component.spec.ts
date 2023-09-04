import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { ControlPanelDashboardComponent } from './dashboard.component';
import { of } from 'rxjs';

describe('ControlPanelDashboardComponent', () => {
  let component: ControlPanelDashboardComponent;
  let fixture: ComponentFixture<ControlPanelDashboardComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ControlPanelDashboardComponent],
      providers: [
        HttpClient, 
        HttpHandler]
    });
    fixture = TestBed.createComponent(ControlPanelDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
