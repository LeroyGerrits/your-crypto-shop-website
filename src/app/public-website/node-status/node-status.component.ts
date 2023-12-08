import { Component, OnInit } from '@angular/core';

import { DigiByteNodeService } from 'src/app/shared/services/DigiByteNode.service';
import { GetDifficultyResponse } from 'src/app/shared/models/parameters/GetDifficultyResponse.model';
import { GetMiningInfoResponse } from 'src/app/shared/models/parameters/GetMiningInfoResponse.model';

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
    private digiByteNodeService: DigiByteNodeService
  ) { }

  ngOnInit(): void {
    this.digiByteNodeService.getDifficulty().subscribe(difficulty => this.nodeDifficulty = difficulty);
    this.digiByteNodeService.getIpAddresses().subscribe(ipAddresses => this.nodeIpAddresses = ipAddresses);
    this.digiByteNodeService.getMiningInfo().subscribe(miningInfo => this.nodeMiningInfo = miningInfo);
  }
}