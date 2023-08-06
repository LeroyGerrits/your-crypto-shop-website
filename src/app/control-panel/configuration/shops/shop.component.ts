import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Shop } from '../../../shared/models/Shop.model';
import { ShopService } from 'src/app/shared/services/Shop.service';

@Component({
  selector: 'control-panel-configuration-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})

export class ShopComponent {
  controlName = new FormControl('', Validators.required);
  controlSubDomain = new FormControl('', [Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9-]*$/)])
  subscriptionSubDomain: Subscription | undefined;

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
    this.form = new FormGroup([this.controlName, this.controlSubDomain]);
    this.subscriptionSubDomain = this.controlSubDomain.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(value => this.checkSubDomainAvailability(value));
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const queryStringShopId = routeParams.get('shopId');

    if (queryStringShopId && queryStringShopId != 'new') {
      this.shopService.getById(queryStringShopId).subscribe(x => { this.onRetrieveData(x); });
    }
  }

  onRetrieveData(shop: Shop) {
    this.shop = shop;
    this.pageTitle = shop.Name;
    this.controlName.setValue(shop.Name);

    if (shop.SubDomain)
      this.controlSubDomain.setValue(shop.SubDomain);
  }

  checkSubDomainAvailability(subdomain: string | null) {
    this.subDomainAvailable = subdomain != 'www';
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