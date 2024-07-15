import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoNodeService } from 'src/app/shared/services/crypto-node.service';
import { HashRatePipe } from 'src/app/shared/pipes/hash-rate.pipe';
import { PublicWebsiteNodeStatusComponent } from './node-status.component';
import { of } from 'rxjs';

describe('PublicWebsiteNodeStatusComponent', () => {
  let component: PublicWebsiteNodeStatusComponent;
  let fixture: ComponentFixture<PublicWebsiteNodeStatusComponent>;
  let ipAddresses: ['1.2.3.4', '5.6.7.8'];
  let cryptoNodeServiceSpy: jasmine.SpyObj<CryptoNodeService>;

  beforeEach(() => {
    cryptoNodeServiceSpy = jasmine.createSpyObj('CryptoNodeService', ['getDifficulty', 'getIpAddresses', 'getMiningInfo']);
    //cryptoNodeServiceSpy.getDifficulty.and.returnValue(of(difficulty));
    cryptoNodeServiceSpy.getIpAddresses.and.returnValue(of(ipAddresses));
    //cryptoNodeServiceSpy.getMiningInfo.and.returnValue(of(miningInfo));

    TestBed.configureTestingModule({
      declarations: [PublicWebsiteNodeStatusComponent, HashRatePipe],
      providers: [
        { provide: CryptoNodeService, useValue: cryptoNodeServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(PublicWebsiteNodeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});