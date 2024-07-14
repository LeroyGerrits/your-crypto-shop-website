import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd } from '@angular/router';
import { of } from 'rxjs';
import { TestDataPublicShops } from 'src/assets/test-data/public-shops';
import { Stats } from '../shared/models/stats.model';
import { GeneralService } from '../shared/services/general.service';
import { ShopService } from '../shared/services/shop.service';
import { PublicWebsiteComponent } from './public-website.component';

describe('PublicWebsiteComponent', () => {
  let component: PublicWebsiteComponent;
  let fixture: ComponentFixture<PublicWebsiteComponent>;

  let matDialogRefSpy: any;
  let matDialogSpy: jasmine.SpyObj<MatDialog>

  let shopServiceSpy: jasmine.SpyObj<ShopService>;
  let generalServiceSpy: jasmine.SpyObj<GeneralService>;

  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(() => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogRefSpy.componentInstance = { title: '', message: '' };
    matDialogRefSpy.afterClosed = () => of(true);

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogSpy.open.and.returnValue(matDialogRefSpy);

    shopServiceSpy = jasmine.createSpyObj('ShopService', ['getListFeaturedPublic']);
    shopServiceSpy.getListFeaturedPublic.and.returnValue(of(TestDataPublicShops));

    generalServiceSpy = jasmine.createSpyObj('GeneralService', ['get']);
    generalServiceSpy.getStats.and.returnValue(of(<Stats>{ Merchants: 0, Shops: 0, Products: 0, Orders: 0 }));

    TestBed.configureTestingModule({
      declarations: [PublicWebsiteComponent],
      imports: [RouterLink, RouterLinkActive, RouterOutlet],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: ShopService, useValue: shopServiceSpy },
        { provide: GeneralService, useValue: generalServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(PublicWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show call to action when index page is active', () => {
    let indexNav = new NavigationEnd(1, '/', '/');
    TestBed.get(Router).events.next(indexNav);
    expect(component.showCallToAction).toBeTrue();
  });

  it('should show a sign up dialog', () => {
    component.signUp();
    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(matDialogRefSpy.close).toHaveBeenCalled();
  });
});