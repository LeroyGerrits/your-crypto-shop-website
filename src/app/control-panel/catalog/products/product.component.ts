import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { Category } from 'src/app/shared/models/Category.model';
import { CategoryService } from 'src/app/shared/services/Category.service';
import { Constants } from 'src/app/shared/Constants';
import { Environment } from 'src/app/shared/environments/Environment';
import { GetCategoriesParameters } from 'src/app/shared/models/parameters/GetCategoriesParameters.model';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Product } from 'src/app/shared/models/Product.model';
import { ProductService } from 'src/app/shared/services/Product.service';
import { Shop } from 'src/app/shared/models/Shop.model';
import { ShopService } from 'src/app/shared/services/Shop.service';

@Component({
  selector: 'control-panel-catalog-product',
  templateUrl: './product.component.html'
})

export class ControlPanelCatalogProductComponent implements OnInit, OnDestroy {
  public treeControl = new NestedTreeControl<Category>(category => category.Children);
  public dataSource = new MatTreeNestedDataSource<Category>();

  public environment = Environment;
  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;
  public queryStringProductId: string | null = '';
  public queryStringShopId: string | null = '';

  public form!: FormGroup;
  public formLoading = false;
  public formSubmitted = false;

  public controlName = new FormControl('', Validators.required);
  public controlShop = new FormControl('', Validators.required);
  public controlDescription = new FormControl('');
  public controlPrice = new FormControl('', [Validators.required, Validators.pattern(Constants.REGEX_PATTERN_DECIMAL_8)]);
  public controlStock = new FormControl('', Validators.pattern(Constants.REGEX_PATTERN_NUMBER));
  public controlVisible = new FormControl(true);

  public categories: Category[] | undefined;
  public pageTitle = 'Create new product'
  public product: Product = new Product();
  public shops: Shop[] | undefined;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private shopService: ShopService,
    private snackBar: MatSnackBar
  ) {
    this.form = new FormGroup([
      this.controlName,
      this.controlShop,
      this.controlDescription,
      this.controlPrice,
      this.controlStock,
      this.controlVisible
    ]);
  }

  ngOnInit() {
    this.queryStringProductId = this.route.snapshot.paramMap.get('productId');
    this.queryStringShopId = this.route.snapshot.paramMap.get('shopId');

    if (this.queryStringProductId && this.queryStringProductId != 'new') {
      this.productService.getById(this.queryStringProductId).subscribe(x => { this.onRetrieveData(x); });
    }

    this.shopService.getList().subscribe(shops => {
      this.shops = shops;

      if (this.queryStringShopId) {
        var selectedShop = this.shops?.find(x => x.Id == this.queryStringShopId);
        if (selectedShop) {
          this.controlShop.setValue(selectedShop.Id);
          this.pageTitle = `Create new product for shop '${selectedShop.Name}'`
        }
      }
    });

    const parameters: GetCategoriesParameters = {};
    if (this.queryStringShopId) {
      parameters.ShopId = this.queryStringShopId;
    }

    this.categoryService.getList(parameters).subscribe(categories => {
      this.categories = categories;
      this.dataSource.data = categories;
    });
  }

  ngOnDestroy() {
    this.snackBarRef?.dismiss();
  }

  hasChild = (_: number, category: Category) => !!category.Children && category.Children.length > 0;

  onRetrieveData(product: Product) {
    this.product = product;
    this.pageTitle = product.Name;
    this.controlName.setValue(product.Name);
    this.controlShop.setValue(product.ShopId);
    this.controlPrice.setValue(product.Price.toString());

    if (product.Stock)
      this.controlStock.setValue(product.Stock.toString());

    if (product.Description)
      this.controlDescription.setValue(product.Description);
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.formLoading = true;

    const productToUpdate: Product = Object.assign({}, this.product);
    productToUpdate.Name = this.controlName.value!;
    productToUpdate.ShopId = this.controlShop.value!;
    productToUpdate.Price = parseFloat(this.controlPrice.value!);

    if (this.controlStock.value)
      productToUpdate.Stock = parseInt(this.controlStock.value);

    productToUpdate.Visible = this.controlVisible.value!;

    if (this.controlDescription.value)
      productToUpdate.Description = this.controlDescription.value;

    if (this.categories) {
      this.categories.forEach(category => {
        console.log(category.Name);
        var element = <HTMLInputElement>document.getElementById('category' + category.Id + '-input');
        console.log(element.checked);
      });
    }

    return;

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