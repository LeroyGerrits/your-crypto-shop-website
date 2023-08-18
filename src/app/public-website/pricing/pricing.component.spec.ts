import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicWebsitePricingComponent } from './pricing.component';

describe('PublicWebsitePricingComponent', () => {
  let component: PublicWebsitePricingComponent;
  let fixture: ComponentFixture<PublicWebsitePricingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicWebsitePricingComponent]
    });
    fixture = TestBed.createComponent(PublicWebsitePricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});