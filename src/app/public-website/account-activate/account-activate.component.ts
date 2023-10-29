import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { MerchantService } from 'src/app/shared/services/Merchant.service';
import { PublicMerchant } from 'src/app/shared/models/viewmodels/PublicMerchant.model';

@Component({
  selector: 'public-website-account-activate',
  templateUrl: './account-activate.component.html'
})

export class PublicWebsiteAccountActivateComponent implements OnInit {
  public merchant: PublicMerchant = new PublicMerchant();

  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;
  public queryStringMerchantId: string | null = '';
  public queryStringMerchantPassword: string | null = '';

  public form!: FormGroup;
  public formLoading = false;
  public formSubmitted = false;

  public controlPassword = new FormControl('', Validators.required);
  public controlPasswordRepetition = new FormControl('', Validators.required);

  constructor(
    private merchantService: MerchantService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // this.authenticationService.merchant.subscribe(x => this.activeMerchant = x?.Merchant);

    this.form = new FormGroup([
      this.controlPassword,
      this.controlPasswordRepetition
    ]);
  }

  ngOnInit() {
    this.queryStringMerchantId = this.route.snapshot.paramMap.get('merchantId');
    this.queryStringMerchantPassword = this.route.snapshot.paramMap.get('merchantPassword');

    if (this.queryStringMerchantId && this.queryStringMerchantPassword) {
      this.merchantService.getByIdAndPasswordPublic(this.queryStringMerchantId, this.queryStringMerchantPassword).subscribe(x => { this.onRetrieveData(x); });
    }
  }

  onRetrieveData(merchant: PublicMerchant) {
    /*this.shop = shop;
    this.pageTitle = shop.Name;
    this.controlName.setValue(shop.Name);

    if (shop.SubDomain) {
      this.controlSubDomain.setValue(shop.SubDomain);
      this.checkSubDomainAvailability(shop.SubDomain);
    }*/
  }

  onSubmit() {

  }
}
