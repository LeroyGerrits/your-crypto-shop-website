import { Component, OnInit } from '@angular/core';

import { CryptoNodeService } from 'src/app/shared/services/crypto-node.service';

@Component({
  selector: 'public-website-node-status',
  templateUrl: './node-status.component.html',
  styleUrl: './node-status.component.scss'
})
export class PublicWebsiteNodeStatusComponent implements OnInit {
  nodeIpAddresses: string[] | undefined;
  
  constructor(
    private cryptoNodeService: CryptoNodeService
  ) { }

  ngOnInit(): void {
    this.cryptoNodeService.getIpAddresses().subscribe(ipAddresses => this.nodeIpAddresses = ipAddresses);
  }
}