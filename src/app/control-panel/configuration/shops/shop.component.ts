import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Constants } from 'src/app/shared/Constants';
import { Environment } from 'src/app/shared/environments/Environment';
import { Shop } from 'src/app/shared/models/Shop.model';
import { ShopService } from 'src/app/shared/services/Shop.service';

@Component({
  selector: 'control-panel-configuration-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})

export class ControlPanelConfigurationShopComponent {
  controlName = new FormControl('', Validators.required);
  controlSubDomain = new FormControl('', [Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9-]*$/)])
  subscriptionSubDomain: Subscription | undefined;

  public environment = Environment;
  public error = '';
  public form!: FormGroup;
  public loading = false;
  public pageTitle = 'Create new shop'
  public shop: Shop = new Shop();
  public submitted = false;
  public subDomainAvailable = true;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService
  ) {
    this.form = new FormGroup([
      this.controlName,
      this.controlSubDomain
    ]);
    this.subscriptionSubDomain = this.controlSubDomain.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(value => this.checkSubDomainAvailability(value));
  }

  ngOnInit(): void {
    const queryStringShopId = this.route.snapshot.paramMap.get('shopId');

    if (queryStringShopId && queryStringShopId != 'new') {
      this.shopService.getById(queryStringShopId).subscribe(x => { this.onRetrieveData(x); });
    }
  }

  onRetrieveData(shop: Shop) {
    this.shop = shop;
    this.pageTitle = shop.Name;
    this.controlName.setValue(shop.Name);

    if (shop.SubDomain) {
      this.controlSubDomain.setValue(shop.SubDomain);
      this.checkSubDomainAvailability(shop.SubDomain);
    }
  }

  checkSubDomainAvailability(subdomain: string | null) {
    if (subdomain && !Constants.RESERVED_SUBDOMAINS.includes(subdomain)) {
      // TO-DO: API call for availability
      this.subDomainAvailable = true;
    } else {
      this.subDomainAvailable = false;
    }

  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.error = '';
    this.loading = true;

    const shopToUpdate: Shop = Object.assign({}, this.shop);
    shopToUpdate.Name = this.controlName.value!;
    shopToUpdate.SubDomain = this.controlSubDomain.value!;

    /*
    this.shopService.create(shopToUpdate)
      .subscribe({
        next: () => {
          // wprls
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });*/
  }
}