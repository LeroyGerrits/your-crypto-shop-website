import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-merchant-link',
  templateUrl: './merchant-link.component.html'
})
export class MerchantLinkComponent implements OnInit {
  @Input() merchantId!: string;
  @Input() merchantSalutation!: string;
  @Input() merchantScore: undefined | number;

  merchantScoreHalf: boolean = false;
  merchantScoreRound: number = 0;
  merchantScoreRemainder: number = 0;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if (this.merchantScore) {
      this.merchantScoreRound = Math.floor(this.merchantScore);
      this.merchantScoreHalf = this.merchantScore - this.merchantScoreRound > 0;
      this.merchantScoreRemainder = (this.merchantScoreHalf ? 4 : 5) - this.merchantScoreRound;
    }
  }
}