import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { Customer } from 'src/app/shared/models/Customer.model';
import { CustomerService } from 'src/app/shared/services/Customer.service';
import { Environment } from 'src/app/shared/environments/Environment';
import { GetCategoriesParameters } from 'src/app/shared/models/parameters/GetCategoriesParameters.model';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Shop } from 'src/app/shared/models/Shop.model';
import { ShopService } from 'src/app/shared/services/Shop.service';

@Component({
  selector: 'control-panel-customer',
  templateUrl: './customer.component.html'
})

export class ControlPanelCustomerComponent implements OnInit, OnDestroy {
  public environment = Environment;
  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;
  public queryStringCustomerId: string | null = '';
  public queryStringShopId: string | null = '';

  public form!: FormGroup;
  public formLoading = false;
  public formSubmitted = false;

  public controlShop = new FormControl('', Validators.required);
  public controlEmailAddress = new FormControl('', [Validators.required, Validators.email]);
  public controlUsername = new FormControl('', Validators.required);
  public controlGender = new FormControl('0', Validators.required);
  public controlFirstName = new FormControl('');
  public controlLastName = new FormControl('', Validators.required);

  public pageTitle = 'Create new customer'
  public customer: Customer = new Customer();
  public shops: Shop[] | undefined;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private shopService: ShopService,
    private snackBar: MatSnackBar
  ) {
    this.form = new FormGroup([
      this.controlShop,
      this.controlEmailAddress,
      this.controlUsername,
      this.controlGender,
      this.controlFirstName,
      this.controlLastName
    ]);
  }

  ngOnInit() {
    this.queryStringCustomerId = this.route.snapshot.paramMap.get('customerId');
    this.queryStringShopId = this.route.snapshot.paramMap.get('shopId');

    this.shopService.getList().subscribe(shops => {
      this.shops = shops;

      if (this.queryStringShopId) {
        var selectedShop = this.shops?.find(x => x.Id == this.queryStringShopId);
        if (selectedShop) {
          this.controlShop.setValue(selectedShop.Id);
          this.pageTitle = `Create new customer for shop '${selectedShop.Name}'`
        }
      }
    });

    const parameters: GetCategoriesParameters = {};
    if (this.queryStringShopId) {
      parameters.ShopId = this.queryStringShopId;
    }

    if (this.queryStringCustomerId && this.queryStringCustomerId != 'new') {
      this.customerService.getById(this.queryStringCustomerId).subscribe(x => this.onRetrieveCustomerData(x));
    }
  }

  ngOnDestroy() {
    this.snackBarRef?.dismiss();
  }

  onRetrieveCustomerData(customer: Customer) {
    this.customer = customer;
    this.pageTitle = customer.Username;
    this.controlShop.setValue(customer.ShopId);
    this.controlUsername.setValue(customer.Username);
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.formLoading = true;

    const customerToUpdate: Customer = Object.assign({}, this.customer);
    customerToUpdate.ShopId = this.controlShop.value!;
    customerToUpdate.Username = this.controlUsername.value!;

    if (this.queryStringCustomerId && this.queryStringCustomerId != 'new') {
      this.customerService.update(customerToUpdate).subscribe({
        next: result => this.handleOnSubmitResult(result),
        error: error => this.handleOnSubmitError(error),
        complete: () => this.formLoading = false
      });
    } else {
      this.customerService.create(customerToUpdate).subscribe({
        next: result => this.handleOnSubmitResult(result),
        error: error => this.handleOnSubmitError(error),
        complete: () => this.formLoading = false
      });
    }
  }

  handleOnSubmitResult(result: MutationResult) {
    if (result.Success) {
      this.router.navigate(['/control-panel/customers']);
    } else {
      this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
      this.formLoading = false;
    }
  }

  handleOnSubmitError(error: string) {
    this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
    this.formLoading = false;
  }
}