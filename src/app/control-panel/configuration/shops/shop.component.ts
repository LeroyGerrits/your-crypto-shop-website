import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Constants } from 'src/app/shared/constants';
import { Country } from 'src/app/shared/models/country.model';
import { CountryService } from 'src/app/shared/services/country.service';
import { CryptoWallet } from 'src/app/shared/models/crypto-wallet.model';
import { CryptoWalletService } from 'src/app/shared/services/crypto-wallet.service';
import { Currency } from 'src/app/shared/models/currency.model';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { Environment } from 'src/app/shared/environments/environment';
import { IDictionaryFormControl } from 'src/app/shared/interfaces/idictionary-formcontrol.interface';
import { Merchant } from 'src/app/shared/models/merchant.model';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { Shop } from 'src/app/shared/models/shop.model';
import { ShopCategory } from 'src/app/shared/models/shop-category.model';
import { ShopCategoryService } from 'src/app/shared/services/shop-category.service';
import { ShopOrderMethod } from 'src/app/shared/enums/shop-order-method.enum';
import { ShopService } from 'src/app/shared/services/shop.service';

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
  public formErrorCryptoWallets = false;
  public formLoading = false;
  public formSubmitted = false;

  public controlName = new FormControl('', Validators.required);
  public controlSubDomain = new FormControl('', [Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9]*$/)])
  public controlCountry = new FormControl('');
  public controlShopCategory = new FormControl('');
  public controlCurrency = new FormControl('', Validators.required);
  public controlOrderMethod = new FormControl('0', Validators.required);
  public controlRequireAddresses = new FormControl(true, Validators.required);
  public controlsCryptoWallet: IDictionaryFormControl = {};

  public pageTitle = 'Create new shop'
  public shop: Shop = new Shop();
  public subDomainAvailable = false;
  public countries: Country[] | undefined;
  public shopCategories: ShopCategory[] | undefined;
  public cryptoWallets: CryptoWallet[] | undefined;
  public currenciesSupportedCrypto: Currency[] = [];
  public currenciesSupportedFiat: Currency[] = [];

  public orderMethodType: typeof ShopOrderMethod = ShopOrderMethod;

  constructor(
    private authenticationService: AuthenticationService,
    private countryService: CountryService,
    private currencyService: CurrencyService,
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
      this.controlShopCategory,
      this.controlCurrency,
      this.controlOrderMethod,
      this.controlRequireAddresses
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
    this.currencyService.getList().subscribe(currencies => {
      currencies.forEach(currency => {
        this.controlsCryptoWallet[currency.Id] = new FormControl('');
        if (currency.Supported) {
          if (currency.Type.toString() == 'Crypto') this.currenciesSupportedCrypto.push(currency);
          if (currency.Type.toString() == 'Fiat') this.currenciesSupportedFiat.push(currency);
        }
      })
    });
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

    if (shop.Currency)
      this.controlCurrency.setValue(shop.Currency.Id);

    if (shop.OrderMethod.toString() == 'ManualActionRequired' || shop.OrderMethod.toString() == ShopOrderMethod.ManualActionRequired.toString()) {
      this.controlOrderMethod.setValue(this.orderMethodType.ManualActionRequired.toString());
    } else {
      this.controlOrderMethod.setValue(this.orderMethodType.Automated.toString());
    }

    this.controlRequireAddresses.setValue(shop.RequireAddresses);
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
    shopToUpdate.OrderMethod = parseInt(this.controlOrderMethod.value!)
    shopToUpdate.RequireAddresses = this.controlRequireAddresses.value!;

    if (this.activeMerchant)
      shopToUpdate.MerchantId = this.activeMerchant!.Id!;

    var selectedCountry = this.countries?.find(x => x.Id == this.controlCountry.value);
    if (selectedCountry)
      shopToUpdate.Country = selectedCountry;
    else
      shopToUpdate.Country = undefined;

    var selectedShopCategory = this.shopCategories?.find(x => x.Id == this.controlShopCategory.value);
    if (selectedShopCategory)
      shopToUpdate.Category = selectedShopCategory;
    else
      shopToUpdate.Category = undefined;

    var selectedCurrency = this.currenciesSupportedFiat?.find(x => x.Id == this.controlCurrency.value);
    if (selectedCurrency)
      shopToUpdate.Currency = selectedCurrency;
    else
      shopToUpdate.Currency = undefined;

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