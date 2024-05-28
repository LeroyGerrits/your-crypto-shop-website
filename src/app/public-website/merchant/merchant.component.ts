import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Constants } from 'src/app/shared/-constants';
import { MerchantService } from 'src/app/shared/services/-merchant.service';
import { PublicMerchant } from 'src/app/shared/models/viewmodels/PublicMerchant.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'public-website-merchant',
  templateUrl: './merchant.component.html'
})
export class PublicWebsiteMerchantComponent implements OnInit {
  public merchant: PublicMerchant | undefined;

  constructor(
    private route: ActivatedRoute,
    private merchantService: MerchantService,
    private titleService: Title
  ) { }

  ngOnInit() {
    const queryStringMerchantId = this.route.snapshot.paramMap.get('merchantId');

    if (queryStringMerchantId) {
      this.GetMerchant(queryStringMerchantId);
    }
  }

  GetMerchant(id: string) {
    this.merchantService.getByIdPublic(id.toString()).subscribe(merchant => {
      this.merchant = merchant;
      this.titleService.setTitle(`${Constants.TITLE_PREFIX} - ${merchant.Username}`);
    });
  }
}