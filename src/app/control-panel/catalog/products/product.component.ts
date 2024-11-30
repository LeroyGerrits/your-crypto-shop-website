import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { Category } from 'src/app/shared/models/category.model';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Constants } from 'src/app/shared/constants';
import { Environment } from 'src/app/shared/environments/environment';
import { Field } from 'src/app/shared/models/field.model';
import { FieldDataType } from 'src/app/shared/enums/field-data-type.enum';
import { FieldEntity } from 'src/app/shared/enums/field-entity.enum';
import { FieldService } from 'src/app/shared/services/field.service';
import { FieldType } from 'src/app/shared/enums/field-type.enum';
import { GetCategoriesParameters } from 'src/app/shared/models/parameters/get-categories-parameters.model';
import { GetFieldsParameters } from 'src/app/shared/models/parameters/get-fields-parameters.model';
import { GetProductResponse } from 'src/app/shared/models/response/get-product-response.model';
import { IDictionaryFormControl } from 'src/app/shared/interfaces/idictionary-formcontrol.interface';
import { IDictionaryString } from 'src/app/shared/interfaces/idictionary-string.interface';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MutateProductRequest } from 'src/app/shared/models/request/mutate-product-request.model';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';
import { Shop } from 'src/app/shared/models/shop.model';
import { ShopService } from 'src/app/shared/services/shop.service';

@Component({
    selector: 'control-panel-catalog-product',
    templateUrl: './product.component.html',
    standalone: false
})

export class ControlPanelCatalogProductComponent implements OnInit, OnDestroy {
  fieldDataTypes = Object.keys(FieldDataType).filter(p => isNaN(p as any));

  public treeControl = new NestedTreeControl<Category>(category => category.Children);
  public dataSourceCategories = new MatTreeNestedDataSource<Category>();

  public environment = Environment;
  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;
  public queryStringProductId: string | null = '';
  public queryStringShopId: string | null = '';

  public form!: FormGroup;
  public formLoading = false;
  public formSubmitted = false;

  public controlCode = new FormControl('');
  public controlName = new FormControl('', Validators.required);
  public controlShop = new FormControl('', Validators.required);
  public controlDescription = new FormControl('');
  public controlPrice = new FormControl('', [Validators.required, Validators.pattern(Constants.REGEX_PATTERN_DECIMAL_8)]);
  public controlStock = new FormControl('', Validators.pattern(Constants.REGEX_PATTERN_NUMBER));
  public controlVisible = new FormControl(true);
  public controlShowOnHome = new FormControl(false);
  public controlFields: IDictionaryFormControl = {};

  public categories: Category[] | undefined;
  public pageTitle = 'Create new product'
  public product: Product = new Product();
  public categoryIds: string[] = [];
  public shops: Shop[] | undefined;
  public fields: Field[] | undefined;

  public formErrorFields: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private fieldService: FieldService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private shopService: ShopService,
    private snackBar: MatSnackBar
  ) {
    this.form = new FormGroup([
      this.controlCode,
      this.controlName,
      this.controlShop,
      this.controlDescription,
      this.controlPrice,
      this.controlStock,
      this.controlVisible,
      this.controlShowOnHome
    ]);
  }

  ngOnInit() {
    this.queryStringProductId = this.route.snapshot.paramMap.get('productId');
    this.queryStringShopId = this.route.snapshot.paramMap.get('shopId');

    // Fetch shop
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

    // Fetch static fields for products
    const getFieldsParameters: GetFieldsParameters = {
      Entity: FieldEntity.Product,
      ShopId: this.queryStringShopId ?? undefined,
      Type: FieldType.Static
    };

    this.fieldService.getList(getFieldsParameters).subscribe(fields => {
      this.fields = fields;

      this.fields.forEach(field => {
        let controlField = new FormControl('');

        if (field.DataType.toString() == this.fieldDataTypes[FieldDataType.Number].toString())
          controlField.addValidators(Validators.pattern(Constants.REGEX_PATTERN_NUMBER));

        if (field.DataType.toString() == this.fieldDataTypes[FieldDataType.Decimal].toString())
          controlField.addValidators(Validators.pattern(Constants.REGEX_PATTERN_DECIMAL_2));

        this.controlFields[field.Id] = controlField;
        this.form.addControl(field.Id, controlField);
      });
    });

    // Fetch categories
    const getCategoriesParameters: GetCategoriesParameters = {};
    if (this.queryStringShopId) {
      getCategoriesParameters.ShopId = this.queryStringShopId;
    }

    this.categoryService.getList(getCategoriesParameters).subscribe(categories => {
      // Fetch products info after categories were fetched
      if (this.queryStringProductId && this.queryStringProductId != 'new') {
        this.productService.getById(this.queryStringProductId).subscribe(product => {
          this.onRetrieveProductData(product);

          // Iterate through fields and set FieldData, if applicable
          if (product.FieldData) {
            this.fields?.forEach(field => {
              if (this.controlFields[field.Id] && product.FieldData![field.Id]) {
                this.controlFields[field.Id].setValue(product.FieldData![field.Id]);
              }
            });
          }

          // Set tree datasource after we've retrieved the checked category IDs
          this.categories = categories;
          this.dataSourceCategories.data = categories;
        });
      } else {
        this.categories = categories;
        this.dataSourceCategories.data = categories;
      }
    });
  }

  ngOnDestroy() {
    this.snackBarRef?.dismiss();
  }

  hasChild = (_: number, category: Category) => !!category.Children && category.Children.length > 0;

  onRetrieveProductData(response: GetProductResponse) {
    this.product = response.Product;
    this.pageTitle = response.Product.Name;

    if (response.Product.Code)
      this.controlCode.setValue(response.Product.Code);

    this.controlName.setValue(response.Product.Name);
    this.controlShop.setValue(response.Product.ShopId);
    this.controlPrice.setValue(response.Product.Price.toString());
    this.controlVisible.setValue(response.Product.Visible);
    this.controlShowOnHome.setValue(response.Product.ShowOnHome);

    if (response.Product.Stock != undefined)
      this.controlStock.setValue(response.Product.Stock.toString());

    if (response.Product.Description)
      this.controlDescription.setValue(response.Product.Description);

    if (response.CategoryIds)
      this.categoryIds = response.CategoryIds;
  }

  onSubmit() {
    this.formSubmitted = true;

    this.formErrorFields = false;

    const dictFieldData: IDictionaryString = {};

    for (let key in this.controlFields) {
      if (this.controlFields[key].errors)
        this.formErrorFields = true;

      if (this.controlFields[key].value)
        dictFieldData[key] = this.controlFields[key].value;
    }

    if (this.form.invalid || this.formErrorFields) {
      return;
    }

    this.formLoading = true;

    const productToUpdate: Product = Object.assign({}, this.product);
    productToUpdate.Code = this.controlCode.value!;
    productToUpdate.Name = this.controlName.value!;
    productToUpdate.ShopId = this.controlShop.value!;
    productToUpdate.Price = parseFloat(this.controlPrice.value!);

    if (this.controlStock.value)
      productToUpdate.Stock = parseInt(this.controlStock.value);
    else
      productToUpdate.Stock = undefined;

    productToUpdate.Visible = this.controlVisible.value!;
    productToUpdate.ShowOnHome = this.controlShowOnHome.value!;

    if (this.controlDescription.value)
      productToUpdate.Description = this.controlDescription.value;

    let checkedCategories: string = '';

    if (this.categories) {
      this.categories.forEach(category => {
        checkedCategories = checkedCategories + this.getCategoryChecked(category);
      });
    }

    const request: MutateProductRequest = {
      Product: productToUpdate,
      CheckedCategories: checkedCategories,
      FieldData: dictFieldData
    };

    if (this.queryStringProductId && this.queryStringProductId != 'new') {
      this.productService.update(request,).subscribe({
        next: result => this.handleOnSubmitResult(result),
        error: error => this.handleOnSubmitError(error),
        complete: () => this.formLoading = false
      });
    } else {
      this.productService.create(request).subscribe({
        next: result => this.handleOnSubmitResult(result),
        error: error => this.handleOnSubmitError(error),
        complete: () => this.formLoading = false
      });
    }
  }

  checkCategory(category: Category, event: MatCheckboxChange) {
    if (event.checked) {
      if (!this.categoryIds.includes(category.Id))
        this.categoryIds.push(category.Id);
    } else {
      if (this.categoryIds.includes(category.Id))
        this.categoryIds.splice(this.categoryIds.indexOf(category.Id), 1);
    }
  }

  getCategoryChecked(category: Category): string {
    let result: string = '';

    if (this.categoryIds.includes(category.Id)) {
      result = ',' + category.Id;
    }

    if (category.Children) {
      category.Children.forEach(childCategory => {
        result = result + this.getCategoryChecked(childCategory);
      });
    }

    return result;
  }

  handleOnSubmitResult(result: MutationResult) {
    if (result.Success) {
      this.router.navigate(['/control-panel/catalog/products']);
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