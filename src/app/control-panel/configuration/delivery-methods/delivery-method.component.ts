import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { Constants } from 'src/app/shared/Constants';
import { Country } from 'src/app/shared/models/Country.model';
import { CountryService } from 'src/app/shared/services/Country.service';
import { DeliveryMethod } from 'src/app/shared/models/DeliveryMethod.model';
import { DeliveryMethodService } from 'src/app/shared/services/DeliveryMethod.service';
import { Environment } from 'src/app/shared/environments/Environment';
import { GetDeliveryMethodResponse } from 'src/app/shared/models/response/GetDeliveryMethodResponse.model';
import { IDictionaryFormControl } from 'src/app/shared/interfaces/idictionary-formcontrol.interface';
import { IDictionaryNumber } from 'src/app/shared/interfaces/idictionary-number.interface';
import { MutateDeliveryMethodRequest } from 'src/app/shared/models/request/MutateDeliveryMethodRequest.model';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Shop } from 'src/app/shared/models/Shop.model';
import { ShopService } from 'src/app/shared/services/Shop.service';

@Component({
  selector: 'control-panel-configuration-delivery-method',
  templateUrl: './delivery-method.component.html'
})

export class ControlPanelConfigurationDeliveryMethodComponent implements OnInit, OnDestroy {
  public environment = Environment;
  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;
  public queryStringDeliveryMethodId: string | null = '';

  public form!: FormGroup;
  public formErrorCostsPerCountry = false;
  public formLoading = false;
  public formSubmitted = false;
  public controlName = new FormControl('', Validators.required);
  public controlShop = new FormControl('', Validators.required);
  public controlCosts = new FormControl('', Validators.pattern(Constants.REGEX_PATTERN_DECIMAL_2));
  public controlsCostsPerCountry = {} as IDictionaryFormControl;

  public deliveryMethod: DeliveryMethod = new DeliveryMethod();
  public deliveryMethodCostsPerCountry: IDictionaryNumber = {};
  public countries: Country[] | undefined;
  public shops: Shop[] | undefined;
  public pageTitle = 'Create new delivery method'

  constructor(
    private countryService: CountryService,
    private deliveryMethodService: DeliveryMethodService,
    private route: ActivatedRoute,
    private router: Router,
    private shopService: ShopService,
    private snackBar: MatSnackBar
  ) {
    this.form = new FormGroup([
      this.controlName,
      this.controlShop,
      this.controlCosts
    ]);
  }

  ngOnInit() {
    this.queryStringDeliveryMethodId = this.route.snapshot.paramMap.get('deliveryMethodId');

    if (this.queryStringDeliveryMethodId && this.queryStringDeliveryMethodId != 'new') {
      this.deliveryMethodService.getById(this.queryStringDeliveryMethodId).subscribe(deliveryMethod => {
        this.onRetrieveDeliveryMethodData(deliveryMethod);

        // Fetch countries after delivery methods are fetched because 
        this.countryService.getList().subscribe(countries => {
          this.countries = countries;
          this.countries.forEach(country => {
            this.controlsCostsPerCountry[country.Id] = new FormControl(this.deliveryMethodCostsPerCountry[country.Id] ?? '', Validators.pattern(Constants.REGEX_PATTERN_DECIMAL_2));
          });
        });
      });
    }

    this.shopService.getList().subscribe(shops => this.shops = shops);
  }

  ngOnDestroy() {
    this.snackBarRef?.dismiss();
  }

  onRetrieveDeliveryMethodData(response: GetDeliveryMethodResponse) {
    this.deliveryMethod = response.DeliveryMethod;
    this.pageTitle = response.DeliveryMethod.Name;
    this.controlName.setValue(response.DeliveryMethod.Name);
    this.controlShop.setValue(response.DeliveryMethod.Shop.Id);

    if (response.DeliveryMethod.Costs)
      this.controlCosts.setValue(response.DeliveryMethod.Costs.toString());

    if (response.CostsPerCountry)
      this.deliveryMethodCostsPerCountry = response.CostsPerCountry;
  }

  onSubmit() {
    this.formSubmitted = true;
    this.formErrorCostsPerCountry = false;

    const dictCostsPerCountry: IDictionaryNumber = {};

    for (let key in this.controlsCostsPerCountry) {
      if (this.controlsCostsPerCountry[key].errors)
        this.formErrorCostsPerCountry = true;

      if (this.controlsCostsPerCountry[key].value)
        dictCostsPerCountry[key] = this.controlsCostsPerCountry[key].value;
    }

    if (this.form.invalid || this.formErrorCostsPerCountry) {
      return;
    }

    this.formLoading = true;

    const deliveryMethodToUpdate: DeliveryMethod = Object.assign({}, this.deliveryMethod);
    deliveryMethodToUpdate.Name = this.controlName.value!;

    var selectedShop = this.shops?.find(x => x.Id == this.controlShop.value);
    if (selectedShop)
      deliveryMethodToUpdate.Shop = selectedShop;

    if (this.controlCosts.value)
      deliveryMethodToUpdate.Costs = parseFloat(this.controlCosts.value);

    const request: MutateDeliveryMethodRequest = {
      DeliveryMethod: deliveryMethodToUpdate,
      CostsPerCountry: dictCostsPerCountry
    };

    if (this.queryStringDeliveryMethodId && this.queryStringDeliveryMethodId != 'new') {
      this.deliveryMethodService.update(request).subscribe({
        next: result => this.handleOnSubmitResult(result),
        error: error => this.handleOnSubmitError(error),
        complete: () => this.formLoading = false
      });
    } else {
      this.deliveryMethodService.create(request).subscribe({
        next: result => this.handleOnSubmitResult(result),
        error: error => this.handleOnSubmitError(error),
        complete: () => this.formLoading = false
      });
    }
  }

  handleOnSubmitResult(result: MutationResult) {
    if (result.Success) {
      this.router.navigate(['/control-panel/configuration/delivery-methods']);
    } else {
      if (result.Constraint == 'UNIQUE_DeliveryMethod_Name') {
        this.snackBarRef = this.snackBar.open('A delivery method with this name already exists for this shop.', 'Close', { panelClass: ['error-snackbar'] });
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