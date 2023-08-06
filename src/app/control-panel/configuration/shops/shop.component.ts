import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Shop } from '../../../shared/models/Shop.model';
import { ShopService } from 'src/app/shared/services/Shop.service';

@Component({
  selector: 'control-panel-configuration-shop',
  templateUrl: './shop.component.html'
})

export class ShopComponent {
  public error = '';
  public form!: FormGroup;
  public loading = false;
  public pageTitle = 'Create new shop'
  public shop: Shop = new Shop();
  public submitted = false;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private shopService: ShopService
  ) {
    this.form = this.formBuilder.group({
      Name: ['', Validators.required],
      SubDomain: ['']
    });
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const queryStringShopId = routeParams.get('shopId');

    if (queryStringShopId && queryStringShopId != 'new') {
      this.shopService.getById(queryStringShopId).subscribe(x => { this.onRetrieveData(x); });
    }
  }

  public get f() { return this.form.controls; }

  onRetrieveData(shop: Shop) {
    this.shop = shop;
    this.pageTitle = shop.Name;
    this.f['Name'].setValue(shop.Name);
    this.f['SubDomain'].setValue(shop.SubDomain);
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.error = '';
    this.loading = true;

    const shopToUpdate: Shop = Object.assign({}, this.shop);
    shopToUpdate.Name = this.f['Name'].value;
    shopToUpdate.SubDomain = this.f['SubDomain'].value

    console.log(this.shop);
    console.log(shopToUpdate);

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