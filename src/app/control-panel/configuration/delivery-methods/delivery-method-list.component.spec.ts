import { ActivatedRoute, RouterLink } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlPanelConfigurationDeliveryMethodListComponent } from './delivery-method-list.component';
import { DeliveryMethodService } from 'src/app/shared/services/DeliveryMethod.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

describe('ControlPanelConfigurationDeliveryMethodListComponent', () => {
  let component: ControlPanelConfigurationDeliveryMethodListComponent;
  let fixture: ComponentFixture<ControlPanelConfigurationDeliveryMethodListComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlPanelConfigurationDeliveryMethodListComponent],
      imports: [BrowserAnimationsModule, MatIconModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, RouterLink],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        DeliveryMethodService,
        HttpClient,
        HttpHandler
      ]
    });
    fixture = TestBed.createComponent(ControlPanelConfigurationDeliveryMethodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});