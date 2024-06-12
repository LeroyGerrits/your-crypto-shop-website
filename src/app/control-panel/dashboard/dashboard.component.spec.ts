import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { ControlPanelDashboardComponent } from './dashboard.component';
import { GeneralService } from 'src/app/shared/services/general.service';
import { Stats } from 'src/app/shared/models/-stats.model';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ControlPanelDashboardComponent', () => {
  let component: ControlPanelDashboardComponent;
  let fixture: ComponentFixture<ControlPanelDashboardComponent>;

  let generalServiceSpy: jasmine.SpyObj<GeneralService>;

  beforeEach(() => {
    generalServiceSpy = jasmine.createSpyObj('generalServiceSpy', ['getDashboardSales']);
    generalServiceSpy.getDashboardSales.and.returnValue(of({}));

    TestBed.configureTestingModule({
    declarations: [ControlPanelDashboardComponent],
    imports: [],
    providers: [
      { provide: GeneralService, useValue: generalServiceSpy },
      provideHttpClient(withInterceptorsFromDi()), 
      provideHttpClientTesting()
    ]
});
    fixture = TestBed.createComponent(ControlPanelDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});