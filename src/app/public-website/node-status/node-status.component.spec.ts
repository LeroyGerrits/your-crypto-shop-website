import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigiByteNodeService } from 'src/app/shared/services/digibyte-node.service';
import { GetDifficultyResponse } from 'src/app/shared/models/parameters/GetDifficultyResponse.model';
import { GetMiningInfoResponse } from 'src/app/shared/models/parameters/GetMiningInfoResponse.model';
import { HashRatePipe } from 'src/app/shared/pipes/HashRate.pipe';
import { PublicWebsiteNodeStatusComponent } from './node-status.component';
import { of } from 'rxjs';

describe('PublicWebsiteNodeStatusComponent', () => {
  let component: PublicWebsiteNodeStatusComponent;
  let fixture: ComponentFixture<PublicWebsiteNodeStatusComponent>;
  let difficulty: GetDifficultyResponse = { Difficulties: { Sha256d: 123, Scrypt: 123, Skein: 123, Qubit: 123, Odo: 123 } };
  let ipAddresses: ['1.2.3.4', '5.6.7.8'];
  let miningInfo: GetMiningInfoResponse = {
    Blocks: 123,
    CurrentBockSize: 123,
    CurrentBlockTx: 123,
    Difficulty: 123,
    GenProcLimit: 123,
    NetworkHashPS: 123456789n,
    PooledTx: 123,
    Testnet: false,
    Generate: false,
    HashesPerSec: 123
  };

  let digiByteNodeServiceSpy: jasmine.SpyObj<DigiByteNodeService>;

  beforeEach(() => {
    digiByteNodeServiceSpy = jasmine.createSpyObj('DigiByteNodeService', ['getDifficulty', 'getIpAddresses', 'getMiningInfo']);
    digiByteNodeServiceSpy.getDifficulty.and.returnValue(of(difficulty));
    digiByteNodeServiceSpy.getIpAddresses.and.returnValue(of(ipAddresses));
    digiByteNodeServiceSpy.getMiningInfo.and.returnValue(of(miningInfo));

    TestBed.configureTestingModule({
      declarations: [PublicWebsiteNodeStatusComponent, HashRatePipe],
      providers: [
        { provide: DigiByteNodeService, useValue: digiByteNodeServiceSpy }
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