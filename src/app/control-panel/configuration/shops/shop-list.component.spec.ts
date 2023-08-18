import { ActivatedRoute, RouterLink } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlPanelConfigurationShopListComponent } from './shop-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ShopService } from 'src/app/shared/services/Shop.service';

describe('ControlPanelConfigurationShopListComponent', () => {
  let component: ControlPanelConfigurationShopListComponent;
  let fixture: ComponentFixture<ControlPanelConfigurationShopListComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlPanelConfigurationShopListComponent],
      imports: [BrowserAnimationsModule, MatIconModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, RouterLink],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        HttpClient,
        HttpHandler,
        ShopService
      ]
    });
    fixture = TestBed.createComponent(ControlPanelConfigurationShopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});