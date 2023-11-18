import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { AuthenticationService } from 'src/app/shared/services/Authentication.service';
import { Constants } from 'src/app/shared/Constants';
import { Country } from 'src/app/shared/models/Country.model';
import { CountryService } from 'src/app/shared/services/Country.service';
import { Environment } from 'src/app/shared/environments/Environment';
import { Merchant } from 'src/app/shared/models/Merchant.model';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Shop } from 'src/app/shared/models/Shop.model';
import { ShopCategory } from 'src/app/shared/models/ShopCategory.model';
import { ShopCategoryService } from 'src/app/shared/services/ShopCategory.service';
import { ShopService } from 'src/app/shared/services/Shop.service';

@Component({
  selector: 'control-panel-configuration-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})

export class ControlPanelConfigurationShopComponent implements OnInit {
  public activeMerchant?: Merchant | null;

  public environment = Environment;
  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;
  public queryStringShopId: string | null = '';

  public form!: FormGroup;
  public formLoading = false;
  public formSubmitted = false;

  public controlName = new FormControl('', Validators.required);
  public controlSubDomain = new FormControl('', [Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9]*$/)])
  public controlCountry = new FormControl('');
  public controlShopCategory = new FormControl('');

  public pageTitle = 'Create new shop'
  public shop: Shop = new Shop();
  public subDomainAvailable = false;
  public countries: Country[] | undefined;
  public shopCategories: ShopCategory[] | undefined;

  constructor(
    private authenticationService: AuthenticationService,
    private countryService: CountryService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private shopService: ShopService,
    private shopCategoryService: ShopCategoryService
  ) {
    this.authenticationService.merchant.subscribe(x => this.activeMerchant = x?.Merchant);

    this.form = new FormGroup([
      this.controlName,
      this.controlSubDomain,
      this.controlCountry,
      this.controlShopCategory
    ]);
    this.controlSubDomain.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(value => this.checkSubDomainAvailability(value));
  }

  ngOnInit() {
    this.queryStringShopId = this.route.snapshot.paramMap.get('shopId');

    if (this.queryStringShopId && this.queryStringShopId != 'new') {
      this.shopService.getById(this.queryStringShopId).subscribe(x => { this.onRetrieveData(x); });
    }

    this.countryService.getList().subscribe(countries => this.countries = countries);
    this.shopCategoryService.getList().subscribe(shopCategories => this.shopCategories = shopCategories);
  }

  ngOnDestroy() {
    this.snackBarRef?.dismiss();
  }

  onRetrieveData(shop: Shop) {
    this.shop = shop;
    this.pageTitle = shop.Name;
    this.controlName.setValue(shop.Name);

    if (shop.SubDomain) {
      this.controlSubDomain.setValue(shop.SubDomain);
      this.subDomainAvailable = true;
    }

    if (shop.Country)
      this.controlCountry.setValue(shop.Country.Id);

    if (shop.Category)
      this.controlShopCategory.setValue(shop.Category.Id);
  }

  checkSubDomainAvailability(subdomain: string | null) {
    this.formLoading = true;

    if (subdomain && subdomain.trim().length >= 3 && !Constants.RESERVED_SUBDOMAINS.includes(subdomain)) {
      this.shopService.subdomainAvailable(subdomain, this.queryStringShopId!).subscribe({
        next: result => this.subDomainAvailable = result,
        error: error => this.handleOnSubmitError(error),
        complete: () => this.formLoading = false
      });
    } else {
      this.subDomainAvailable = false;
      this.formLoading = false;
    }
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.formLoading = true;

    const shopToUpdate: Shop = Object.assign({}, this.shop);
    shopToUpdate.Name = this.controlName.value!;
    shopToUpdate.SubDomain = this.controlSubDomain.value!;

    if (this.activeMerchant)
      shopToUpdate.MerchantId = this.activeMerchant!.Id!;

    var selectedCountry = this.countries?.find(x => x.Id == this.controlCountry.value);
    if (selectedCountry)
      shopToUpdate.Country = selectedCountry;

    var selectedShopCategory = this.shopCategories?.find(x => x.Id == this.controlShopCategory.value);
    if (selectedShopCategory)
      shopToUpdate.Category = selectedShopCategory;

    if (this.queryStringShopId && this.queryStringShopId != 'new') {
      this.shopService.update(shopToUpdate).subscribe({
        next: result => this.handleOnSubmitResult(result),
        error: error => this.handleOnSubmitError(error),
        complete: () => this.formLoading = false
      });
    } else {
      this.shopService.create(shopToUpdate).subscribe({
        next: result => this.handleOnSubmitResult(result),
        error: error => this.handleOnSubmitError(error),
        complete: () => this.formLoading = false
      });
    }
  }

  handleOnSubmitResult(result: MutationResult) {
    if (result.Success) {
      this.router.navigate(['/control-panel/configuration/shops']);
    } else {
      if (result.Constraint == 'UNIQUE_Shop_SubDomain') {
        this.snackBarRef = this.snackBar.open('This subdomain is already taken.', 'Close', { panelClass: ['error-snackbar'] });
      } else {
        this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
      }
    }
  }

  handleOnSubmitError(error: string) {
    this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
    this.formLoading = false;
  }
}