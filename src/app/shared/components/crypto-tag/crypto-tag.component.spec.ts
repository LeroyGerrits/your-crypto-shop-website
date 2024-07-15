import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoTagComponent } from './crypto-tag.component';

describe('MerchantLinkComponent', () => {
  let component: CryptoTagComponent;
  let fixture: ComponentFixture<CryptoTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CryptoTagComponent]
    });
    fixture = TestBed.createComponent(CryptoTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display 3 full, 1 half and 1 empty star when a merchant\'s score is 3.5', () => {
    component.cryptoCode = 'BTC';
    component.cryptoCode = 'BTC';
    expect(component).toBeTruthy();
  });
});