import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelDashboardComponent } from './dashboard.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ControlPanelDashboardComponent', () => {
  let component: ControlPanelDashboardComponent;
  let fixture: ComponentFixture<ControlPanelDashboardComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
    declarations: [ControlPanelDashboardComponent],
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    fixture = TestBed.createComponent(ControlPanelDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});