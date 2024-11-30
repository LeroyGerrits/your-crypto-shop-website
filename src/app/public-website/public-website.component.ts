import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Constants } from '../shared/constants';
import { DialogSignUpComponent } from '../shared/dialogs/signup/dialog.signup.component';
import { CurrencyRate } from '../shared/models/currency-rate.model';
import { Currency } from '../shared/models/currency.model';
import { Stats } from '../shared/models/stats.model';
import { PublicShop } from '../shared/models/viewmodels/public-shop.model';
import { CurrencyRateService } from '../shared/services/currency-rate.service';
import { CurrencyService } from '../shared/services/currency.service';
import { GeneralService } from '../shared/services/general.service';
import { ShopService } from '../shared/services/shop.service';
import { IDictionaryNumber } from '../shared/interfaces/idictionary-number.interface';
import { GetCurrencyRatesParameters } from '../shared/models/parameters/get-currency-rates-parameters.model';

@Component({
    selector: 'public-website',
    templateUrl: './public-website.component.html',
    standalone: false
})
export class PublicWebsiteComponent implements OnInit {
  public controlSelectedCurrencyFiat = new FormControl(Constants.CURRENCY_ID_USD);
  public currencyRates: CurrencyRate[] = [];
  public currencies: Currency[] = [];
  public currenciesSupportedCrypto: Currency[] = [];
  public currenciesSupportedFiat: Currency[] = [];
  public dictCurrencyRates: IDictionaryNumber = {};
  public showCallToAction: boolean = this.router.url == '/';
  public featuredShops: PublicShop[] | undefined;
  public selectedCurrencyFiat: Currency | undefined;
  public stats: Stats = <Stats>{
    Merchants: 0,
    Shops: 0,
    Products: 0,
    Orders: 0
  };

  constructor(
    private dialog: MatDialog,
    private currencyRateService: CurrencyRateService,
    private currencyService: CurrencyService,
    private generalService: GeneralService,
    private router: Router,
    private shopService: ShopService
  ) { }

  ngOnInit() {
    this.currencyService.getList().subscribe(currencies => {
      this.currencies = currencies;

      this.retrieveCurrencyRates();

      currencies.forEach(currency => {
        if (currency.Supported) {
          if (currency.Type.toString() == 'Crypto') this.currenciesSupportedCrypto.push(currency);
          if (currency.Type.toString() == 'Fiat') this.currenciesSupportedFiat.push(currency);
        }
      });
    });
    this.shopService.getListFeaturedPublic().subscribe(shops => this.featuredShops = shops);
    this.generalService.getStats().subscribe(stats => this.stats = stats);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showCallToAction = event.url == '/';
      }
    });
  }

  retrieveCurrencyRates() {
    const selectedCurrencyFiatId = this.controlSelectedCurrencyFiat.value;
    if (selectedCurrencyFiatId) {
      var foundCurrency = this.currencies.find(x => x.Id == selectedCurrencyFiatId);
      if (foundCurrency)
        this.selectedCurrencyFiat = foundCurrency;

      let currencyRateParameters = new GetCurrencyRatesParameters();
      currencyRateParameters.CurrencyFromId = selectedCurrencyFiatId;

      this.currencyRateService.getList(currencyRateParameters).subscribe(currencyRates => {
        this.currencyRates = currencyRates;

        currencyRates.forEach(currencyRate => {
          this.dictCurrencyRates[currencyRate.CurrencyToId] = currencyRate.InvertedRate;
        });
      });
    }
  }

  signUp() {
    const dialogSignUp = this.dialog.open(DialogSignUpComponent);
    dialogSignUp.afterClosed().subscribe(result => {
      if (result) {
        dialogSignUp.close();
      }
    });
  }
}