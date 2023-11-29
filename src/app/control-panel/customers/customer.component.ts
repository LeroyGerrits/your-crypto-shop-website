import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { Country } from 'src/app/shared/models/Country.model';
import { CountryService } from 'src/app/shared/services/Country.service';
import { Customer } from 'src/app/shared/models/Customer.model';
import { CustomerService } from 'src/app/shared/services/Customer.service';
import { Environment } from 'src/app/shared/environments/Environment';
import { Gender } from 'src/app/shared/enums/Gender.enum';
import { GetCategoriesParameters } from 'src/app/shared/models/parameters/GetCategoriesParameters.model';
import { MutateCustomerRequest } from 'src/app/shared/models/request/MutateCustomerRequest.model';
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
  public controlAddressLine1 = new FormControl('', Validators.required);
  public controlAddressLine2 = new FormControl('');
  public controlPostalCode = new FormControl('', Validators.required);
  public controlCity = new FormControl('', Validators.required);
  public controlProvince = new FormControl('');
  public controlCountry = new FormControl('', Validators.required);

  public pageTitle = 'Create new customer'
  public countries: Country[] | undefined;
  public shops: Shop[] | undefined;
  public customer: Customer = new Customer();

  public genderType: typeof Gender = Gender;

  constructor(
    private countryService: CountryService,
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
      this.controlLastName,
      this.controlAddressLine1,
      this.controlAddressLine2,
      this.controlPostalCode,
      this.controlCity,
      this.controlProvince,
      this.controlCountry
    ]);
  }

  ngOnInit() {
    this.queryStringCustomerId = this.route.snapshot.paramMap.get('customerId');
    this.queryStringShopId = this.route.snapshot.paramMap.get('shopId');

    this.countryService.getList().subscribe(countries => this.countries = countries);
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
    this.controlEmailAddress.setValue(customer.EmailAddress);
    this.controlUsername.setValue(customer.Username);

    if (customer.Gender.toString() == 'Male') {
      this.controlGender.setValue(this.genderType.Male.toString());
    } else if (customer.Gender.toString() == 'Female') {
      this.controlGender.setValue(this.genderType.Female.toString());
    } else {
      this.controlGender.setValue(this.genderType.Unspecified.toString());
    }

    if (customer.FirstName)
      this.controlFirstName.setValue(customer.FirstName);

    this.controlLastName.setValue(customer.LastName);
    this.controlAddressLine1.setValue(customer.Address.AddressLine1);

    if (customer.Address.AddressLine2)
      this.controlAddressLine2.setValue(customer.Address.AddressLine2);

    this.controlPostalCode.setValue(customer.Address.PostalCode);
    this.controlCity.setValue(customer.Address.City);

    if (customer.Address.Province)
      this.controlProvince.setValue(customer.Address.Province);

    this.controlCountry.setValue(customer.Address.Country!.Id.toString());
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.formLoading = true;

    const customerToUpdate: Customer = Object.assign({}, this.customer);
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