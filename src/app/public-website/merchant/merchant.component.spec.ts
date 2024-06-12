import { ActivatedRoute, RouterLink, convertToParamMap } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { MerchantService } from 'src/app/shared/services/merchant.service';
import { PublicWebsiteMerchantComponent } from './merchant.component';
import { TestDataPublicMerchants } from 'src/assets/test-data/PublicMerchants';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PublicWebsiteMerchantComponent', () => {
  let component: PublicWebsiteMerchantComponent;
  let fixture: ComponentFixture<PublicWebsiteMerchantComponent>;

  let merchantServiceSpy: jasmine.SpyObj<MerchantService>;

  beforeEach(() => {
    merchantServiceSpy = jasmine.createSpyObj('MerchantService', ['getByIdPublic']);
    merchantServiceSpy.getByIdPublic.and.returnValue(of(TestDataPublicMerchants[0]));

    TestBed.configureTestingModule({
    declarations: [PublicWebsiteMerchantComponent],
    imports: [RouterLink],
    providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ merchantId: TestDataPublicMerchants[0].Id }) } } },
        { provide: MerchantService, useValue: merchantServiceSpy },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    fixture = TestBed.createComponent(PublicWebsiteMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve a merchant', () => {
    component.GetMerchant(TestDataPublicMerchants[0].Id);
    expect(merchantServiceSpy.getByIdPublic).toHaveBeenCalled();
  });
});