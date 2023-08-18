import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicWebsiteIndexComponent } from './index.component';

describe('PublicWebsiteIndexComponent', () => {
  let component: PublicWebsiteIndexComponent;
  let fixture: ComponentFixture<PublicWebsiteIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicWebsiteIndexComponent]
    });
    fixture = TestBed.createComponent(PublicWebsiteIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
