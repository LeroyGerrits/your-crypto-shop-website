import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Environment } from 'src/app/shared/environments/Environment';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Order } from 'src/app/shared/models/Order.model';
import { OrderService } from 'src/app/shared/services/Order.service';
import { ShopService } from 'src/app/shared/services/Shop.service';

@Component({
  selector: 'control-panel-sales-order',
  templateUrl: './order.component.html'
})

export class ControlPanelSalesOrderComponent {
  public environment = Environment;
  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;
  public queryStringOrderId: string | null = '';

  public form!: FormGroup;
  public formLoading = false;
  public formSubmitted = false;

  public controlStatus = new FormControl('', Validators.required);

  public pageTitle = 'Create new customer'
  public order: Order = new Order();

  constructor(
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {
    this.form = new FormGroup([
      this.controlStatus
    ]);
  }

  ngOnInit() {
    this.queryStringOrderId = this.route.snapshot.paramMap.get('orderId');

    if (this.queryStringOrderId && this.queryStringOrderId != 'new') {
      this.orderService.getById(this.queryStringOrderId).subscribe(x => this.onRetrieveOrderData(x));
    }
  }

  ngOnDestroy() {
    this.snackBarRef?.dismiss();
  }

  onRetrieveOrderData(order: Order) {
    this.order = order;
    this.pageTitle = this.datePipe.transform(order.Date, 'dd-MM-yyyy HH:ss') + ` (${order.Customer.Username})`;

  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.formLoading = true;

    /*const customerToUpdate: Customer = Object.assign({}, this.customer);
    customerToUpdate.ShopId = this.controlShop.value!;
    customerToUpdate.EmailAddress = this.controlEmailAddress.value!;
    customerToUpdate.Username = this.controlUsername.value!;
    customerToUpdate.LastName = this.controlLastName.value!;
    customerToUpdate.Gender = parseInt(this.controlGender.value!)

    if (this.controlFirstName.value)
      customerToUpdate.FirstName = this.controlFirstName.value;

    const request: MutateCustomerRequest = {
      Customer: customerToUpdate,
      AddressLine1: this.controlAddressLine1.value!,
      PostalCode: this.controlPostalCode.value!,
      City: this.controlCity.value!
    };

    if (this.controlAddressLine2.value)
      request.AddressLine2 = this.controlAddressLine2.value;

    if (this.controlProvince.value)
      request.Province = this.controlProvince.value;

    var selectedCountry = this.countries?.find(x => x.Id == this.controlCountry.value);
    if (selectedCountry)
      request.Country = selectedCountry;

    if (this.queryStringCustomerId && this.queryStringCustomerId != 'new') {
      this.customerService.update(request).subscribe({
        next: result => this.handleOnSubmitResult(result),
        error: error => this.handleOnSubmitError(error),
        complete: () => this.formLoading = false
      });
    } else {
      this.customerService.create(request).subscribe({
        next: result => this.handleOnSubmitResult(result),
        error: error => this.handleOnSubmitError(error),
        complete: () => this.formLoading = false
      });
    }*/
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