import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { Constants } from 'src/app/shared/Constants';
import { DeliveryMethod } from 'src/app/shared/models/DeliveryMethod.model';
import { DeliveryMethodService } from 'src/app/shared/services/DeliveryMethod.service';
import { Environment } from 'src/app/shared/environments/Environment';
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
  public formLoading = false;
  public formSubmitted = false;
  public controlName = new FormControl('', Validators.required);
  public controlShop = new FormControl('', Validators.required);
  public controlCosts = new FormControl('', Validators.pattern(Constants.REGEX_PATTERN_DECIMAL));

  public pageTitle = 'Create new delivery method'
  public deliveryMethod: DeliveryMethod = new DeliveryMethod();
  public shops: Shop[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private deliveryMethodService: DeliveryMethodService,
    private shopService: ShopService
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
      this.deliveryMethodService.getById(this.queryStringDeliveryMethodId).subscribe(x => { this.onRetrieveData(x); });
    }

    this.shopService.getList().subscribe(shops => this.shops = shops);
  }

  ngOnDestroy() {
    this.snackBarRef?.dismiss();
  }

  onRetrieveData(deliveryMethod: DeliveryMethod) {
    this.deliveryMethod = deliveryMethod;
    this.pageTitle = deliveryMethod.Name;
    this.controlName.setValue(deliveryMethod.Name);
    this.controlShop.setValue(deliveryMethod.Shop.Id);

    if (deliveryMethod.Costs)
      this.controlCosts.setValue(deliveryMethod.Costs.toString());
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.form.invalid) {
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

    if (this.queryStringDeliveryMethodId && this.queryStringDeliveryMethodId != 'new') {
      this.deliveryMethodService.update(deliveryMethodToUpdate).subscribe({
        next: result => this.handleOnSubmitResult(result),
        error: error => this.handleOnSubmitError(error),
        complete: () => this.formLoading = false
      });
    } else {
      this.deliveryMethodService.create(deliveryMethodToUpdate).subscribe({
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