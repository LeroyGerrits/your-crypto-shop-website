import { Component, OnInit } from '@angular/core';

import { CryptoNodeService } from 'src/app/shared/services/crypto-node.service';
import { GetDifficultyResponse } from 'src/app/shared/models/parameters/get-difficulty-response.model';
import { GetMiningInfoResponse } from 'src/app/shared/models/parameters/get-mining-info-response.model';

@Component({
  selector: 'public-website-node-status',
  templateUrl: './node-status.component.html',
  styleUrl: './node-status.component.scss'
})
export class PublicWebsiteNodeStatusComponent implements OnInit {
  nodeDifficulty: GetDifficultyResponse | undefined;
  nodeIpAddresses: string[] | undefined;
  nodeMiningInfo: GetMiningInfoResponse | undefined;

  constructor(
    private cryptoNodeService: CryptoNodeService
  ) { }

  ngOnInit(): void {
    this.cryptoNodeService.getDifficulty().subscribe(difficulty => this.nodeDifficulty = difficulty);
    this.cryptoNodeService.getIpAddresses().subscribe(ipAddresses => this.nodeIpAddresses = ipAddresses);
    this.cryptoNodeService.getMiningInfo().subscribe(miningInfo => this.nodeMiningInfo = miningInfo);
  }
}