import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { Constants } from 'src/app/shared/Constants';
import { Environment } from 'src/app/shared/environments/Environment';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Product } from 'src/app/shared/models/Product.model';
import { ProductService } from 'src/app/shared/services/Product.service';
import { Shop } from 'src/app/shared/models/Shop.model';
import { ShopService } from 'src/app/shared/services/Shop.service';

@Component({
  selector: 'control-panel-catalog-product',
  templateUrl: './product.component.html'
})

export class ControlPanelCatalogProductComponent implements OnInit, OnDestroy {
  public environment = Environment;
  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;
  public queryStringProductId: string | null = '';

  public form!: FormGroup;
  public formLoading = false;
  public formSubmitted = false;
  public controlName = new FormControl('', Validators.required);
  public controlDescription = new FormControl('');
  public controlShop = new FormControl('', Validators.required);
  public controlPrice = new FormControl('', Validators.pattern(Constants.REGEX_PATTERN_DECIMAL));

  public pageTitle = 'Create new product'
  public product: Product = new Product();
  public shops: Shop[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private productService: ProductService,
    private shopService: ShopService
  ) {
    this.form = new FormGroup([
      this.controlName,
      this.controlDescription,
      this.controlShop,
      this.controlPrice
    ]);
  }

  ngOnInit() {
    this.queryStringProductId = this.route.snapshot.paramMap.get('productId');

    if (this.queryStringProductId && this.queryStringProductId != 'new') {
      this.productService.getById(this.queryStringProductId).subscribe(x => { this.onRetrieveData(x); });
    }

    this.shopService.getList().subscribe(shops => this.shops = shops);
  }

  ngOnDestroy() {
    this.snackBarRef?.dismiss();
  }

  onRetrieveData(product: Product) {
    this.product = product;
    this.pageTitle = product.Name;
    this.controlName.setValue(product.Name);
    this.controlShop.setValue(product.Shop.Id);
    this.controlPrice.setValue(product.Price.toString());
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.formLoading = true;

    const productToUpdate: Product = Object.assign({}, this.product);
    productToUpdate.Name = this.controlName.value!;

    if (this.controlDescription.value)
      productToUpdate.Description = this.controlDescription.value;

    var selectedShop = this.shops?.find(x => x.Id == this.controlShop.value);
    if (selectedShop)
      productToUpdate.Shop = selectedShop;

    productToUpdate.Price = parseFloat(this.controlPrice.value!);

    if (this.queryStringProductId && this.queryStringProductId != 'new') {
      this.productService.update(productToUpdate).subscribe({
        next: result => this.handleOnSubmitResult(result),
        error: error => this.handleOnSubmitError(error),
        complete: () => this.formLoading = false
      });
    } else {
      this.productService.create(productToUpdate).subscribe({
        next: result => this.handleOnSubmitResult(result),
        error: error => this.handleOnSubmitError(error),
        complete: () => this.formLoading = false
      });
    }
  }

  handleOnSubmitResult(result: MutationResult) {
    if (result.Success) {
      this.router.navigate(['/control-panel/catalog/products']);
    } else {
      this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
    }
  }

  handleOnSubmitError(error: string) {
    this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
    this.formLoading = false;
  }
}