import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountryService } from 'src/app/shared/services/-country.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { PublicWebsiteShopListComponent } from './shop-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ShopCategoryService } from 'src/app/shared/services/shop-category.service';
import { ShopService } from 'src/app/shared/services/-shop.service';
import { Sort } from '@angular/material/sort';
import { TestDataCountries } from 'src/assets/test-data/Countries';
import { TestDataPublicShops } from 'src/assets/test-data/PublicShops';
import { TestDataShopCategories } from 'src/assets/test-data/ShopCategories';
import { of } from 'rxjs';

describe('PublicWebsiteShopListComponent', () => {
  let component: PublicWebsiteShopListComponent;
  let fixture: ComponentFixture<PublicWebsiteShopListComponent>;

  let countryServiceSpy: jasmine.SpyObj<CountryService>;
  let shopServiceSpy: jasmine.SpyObj<ShopService>;
  let shopCategoryServiceSpy: jasmine.SpyObj<ShopCategoryService>;

  beforeEach(() => {
    countryServiceSpy = jasmine.createSpyObj('CountryService', ['getList']);
    countryServiceSpy.getList.and.returnValue(of(TestDataCountries));

    shopServiceSpy = jasmine.createSpyObj('ShopService', ['getListPublic']);
    shopServiceSpy.getListPublic.and.returnValue(of(TestDataPublicShops));

    shopCategoryServiceSpy = jasmine.createSpyObj('ShopCategoryService', ['getList']);
    shopCategoryServiceSpy.getList.and.returnValue(of(TestDataShopCategories));

    TestBed.configureTestingModule({
      declarations: [PublicWebsiteShopListComponent],
      imports: [BrowserAnimationsModule, MatExpansionModule, MatIconModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatTableModule, ReactiveFormsModule, RouterLink, RouterTestingModule.withRoutes(
        [{ path: 'shops', component: PublicWebsiteShopListComponent }]
      )],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { data: {} } } },
        { provide: CountryService, useValue: countryServiceSpy },
        { provide: ShopService, useValue: shopServiceSpy },
        { provide: ShopCategoryService, useValue: shopCategoryServiceSpy },
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

  it('should filter shops list when country filter gets used', fakeAsync(() => {
    const componentStub: PublicWebsiteShopListComponent = TestBed.inject(PublicWebsiteShopListComponent);
    spyOn(componentStub, 'filterShops');
    componentStub.controlFilterCountry.setValue('test');
    tick(1000);
    expect(componentStub.filterShops).toHaveBeenCalled();
  }));

  it('should filter shops list when category filter gets used', fakeAsync(() => {
    const componentStub: PublicWebsiteShopListComponent = TestBed.inject(PublicWebsiteShopListComponent);
    spyOn(componentStub, 'filterShops');
    componentStub.controlFilterShopCategory.setValue('test');
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