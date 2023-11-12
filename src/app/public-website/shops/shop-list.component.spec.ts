import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { PublicWebsiteShopListComponent } from './shop-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ShopService } from 'src/app/shared/services/Shop.service';
import { Sort } from '@angular/material/sort';
import { TestDataPublicShops } from 'src/assets/test-data/PublicShops';
import { of } from 'rxjs';

describe('PublicWebsiteShopListComponent', () => {
  let component: PublicWebsiteShopListComponent;
  let fixture: ComponentFixture<PublicWebsiteShopListComponent>;

  let shopServiceSpy: jasmine.SpyObj<ShopService>;

  beforeEach(() => {
    shopServiceSpy = jasmine.createSpyObj('ShopService', ['getListPublic']);
    shopServiceSpy.getListPublic.and.returnValue(of(TestDataPublicShops));

    TestBed.configureTestingModule({
      declarations: [PublicWebsiteShopListComponent],
      imports: [BrowserAnimationsModule, MatIconModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, ReactiveFormsModule, RouterLink, RouterTestingModule.withRoutes(
        [{ path: 'shops', component: PublicWebsiteShopListComponent }]
      )],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { data: {} } } },
        { provide: ShopService, useValue: shopServiceSpy },
        PublicWebsiteShopListComponent,
        Router
      ]
    });
    fixture = TestBed.createComponent(PublicWebsiteShopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should filter shops list when name filter gets used', fakeAsync(() => {
    const componentStub: PublicWebsiteShopListComponent = TestBed.inject(PublicWebsiteShopListComponent);
    spyOn(componentStub, 'filterShops');
    componentStub.controlFilterName.setValue('test');
    tick(1000);
    expect(componentStub.filterShops).toHaveBeenCalled();
  }));

  it('should filter shops list when subdomain filter gets used', fakeAsync(() => {
    const componentStub: PublicWebsiteShopListComponent = TestBed.inject(PublicWebsiteShopListComponent);
    spyOn(componentStub, 'filterShops');
    componentStub.controlFilterSubDomain.setValue('test');
    tick(1000);
    expect(componentStub.filterShops).toHaveBeenCalled();
  }));

  it('should edit the sortState when a sort direction is supplied', () => {
    const routerstub: Router = TestBed.inject(Router);
    spyOn(routerstub, 'navigate');

    const fakeSortEvent: Sort = { active: 'fakeActive', direction: 'asc' };
    component.onSortChange(fakeSortEvent);
    expect(component.sortDirection).toBe('asc');
  });

  it('should clear the sortState when no sort direction is supplied', () => {
    const routerstub: Router = TestBed.inject(Router);
    spyOn(routerstub, 'navigate');

    const fakeSortEvent: Sort = { active: 'fakeActive', direction: '' };
    component.onSortChange(fakeSortEvent);
    expect(component.sortDirection).toBeNull();
  });
});