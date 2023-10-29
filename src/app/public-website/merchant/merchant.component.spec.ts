import { ActivatedRoute, RouterLink, convertToParamMap } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MerchantService } from 'src/app/shared/services/Merchant.service';
import { PublicWebsiteMerchantComponent } from './merchant.component';
import { TestDataPublicMerchants } from 'src/assets/test-data/PublicMerchants';
import { of } from 'rxjs';

describe('PublicWebsiteMerchantComponent', () => {
  let component: PublicWebsiteMerchantComponent;
  let fixture: ComponentFixture<PublicWebsiteMerchantComponent>;

  let merchantServiceSpy: jasmine.SpyObj<MerchantService>;

  beforeEach(() => {
    merchantServiceSpy = jasmine.createSpyObj('MerchantService', ['getByIdPublic']);
    merchantServiceSpy.getByIdPublic.and.returnValue(of(TestDataPublicMerchants[0]));

    TestBed.configureTestingModule({
      declarations: [PublicWebsiteMerchantComponent],
      imports: [RouterLink, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ merchantId: TestDataPublicMerchants[0].Id }) } } },
        { provide: MerchantService, useValue: merchantServiceSpy }
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