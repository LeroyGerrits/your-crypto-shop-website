import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Constants } from 'src/app/shared/constants';
import { DialogConfirmComponent } from 'src/app/shared/dialogs/confirm/dialog.confirm.component';
import { DialogDeleteComponent } from 'src/app/shared/dialogs/delete/dialog.delete.component';
import { Environment } from 'src/app/shared/environments/environment';
import { Category } from 'src/app/shared/models/category.model';
import { Merchant } from 'src/app/shared/models/merchant.model';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { GetProductsParameters } from 'src/app/shared/models/parameters/get-products-parameters.model';
import { Product } from 'src/app/shared/models/product.model';
import { Shop } from 'src/app/shared/models/shop.model';
import { BooleanConvertPipe } from 'src/app/shared/pipes/boolean-convert.pipe';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { ShopService } from 'src/app/shared/services/shop.service';

@Component({
  selector: 'control-panel-catalog-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})

export class ControlPanelCatalogProductListComponent {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  public activeMerchant?: Merchant | null;

  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

  environment = Environment;
  constants = Constants;
  dataSource = new MatTableDataSource<Product>;
  displayedColumns: string[] = ['Photo', 'Code', 'Name', 'Stock', 'Price', 'ActionButtons'];
  sortDirection: string | null = 'asc';
  finishedLoading: boolean = false;

  public form!: FormGroup;
  public controlFilterCode = new FormControl('');
  public controlFilterName = new FormControl('');
  public controlFilterShop = new FormControl('');
  public controlFilterCategory = new FormControl('');
  public controlFilterVisible = new FormControl('');
  public controlFilterShowOnHome = new FormControl('');

  public shops: Shop[] | undefined;
  public categories: Category[] | undefined;

  constructor(
    private authenticationService: AuthenticationService,
    private booleanConvertPipe: BooleanConvertPipe,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private productService: ProductService,
    private shopService: ShopService
  ) {
    this.form = new FormGroup([
      this.controlFilterCode,
      this.controlFilterName,
      this.controlFilterShop,
      this.controlFilterCategory,
      this.controlFilterVisible,
      this.controlFilterShowOnHome
    ]);

    this.controlFilterCode.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterProducts());
    this.controlFilterName.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterProducts());
    this.controlFilterCategory.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterProducts());
    this.controlFilterVisible.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterProducts());
    this.controlFilterShowOnHome.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterProducts());
  }

  ngOnInit() {
    this.authenticationService.merchant.subscribe(x => this.activeMerchant = x?.Merchant);

    this.shopService.getList().subscribe(shops => {
      this.shops = shops;

      if (shops && shops[0]) {
        this.controlFilterShop.setValue(shops[0].Id);
        this.filterProducts();
      } else {
        this.finishedLoading = true;
      }
    });

    this.categoryService.getList().subscribe(categories => {
      this.categories = categories;
      // TO-DO: Construct dictionary here for filter dropdown
    });
  }

  ngOnDestroy(): void {
    this.snackBarRef?.dismiss();
  }

  filterProducts() {
    const parameters: GetProductsParameters = {
      Code: this.controlFilterCode.value!,
      Name: this.controlFilterName.value!,
      ShopId: this.controlFilterShop.value!
    };

    if (this.controlFilterVisible.value)
      parameters.Visible = this.booleanConvertPipe.transform(this.controlFilterVisible.value!);

    if (this.controlFilterShowOnHome.value)
      parameters.ShowOnHome = this.booleanConvertPipe.transform(this.controlFilterShowOnHome.value!);

    this.productService.getList(parameters).subscribe(products => {
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.finishedLoading = true;
    });
  }

  onSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.sortDirection = sortState.direction.toString();
    } else {
      this.sortDirection = null;
    }
  }

  editElement(element: Product) {
    this.router.navigate([`/control-panel/catalog/products/${element.Id}/${this.controlFilterShop.value}`]);
  }

  editPhotos(element: Product) {
    this.router.navigate([`/control-panel/catalog/products/${element.Id}/${this.controlFilterShop.value}/photos`]);
  }

  duplicateElement(element: Product) {
    const dialogConfirm = this.dialog.open(DialogConfirmComponent);
    const instance = dialogConfirm.componentInstance;
    instance.dialogMessage = `Are you sure you want to duplicate product '${element.Name}'? A copy of this product will be created, the product name will be suffixed with *COPY*.`;

    dialogConfirm.afterClosed().subscribe(result => {
      if (result) {
        this.productService.duplicate(element.Id).subscribe({
          next: result => this.handleOnSubmitResult(result),
          error: error => this.handleOnSubmitError(error),
          complete: () => dialogConfirm.close()
        });
      }
    });
  }

  deleteElement(element: Product) {
    const dialogDelete = this.dialog.open(DialogDeleteComponent);
    const instance = dialogDelete.componentInstance;
    instance.dialogMessage = `Are you sure you want to delete product '${element.Name}'?`;

    dialogDelete.afterClosed().subscribe(result => {
      if (result) {
        this.productService.delete(element.Id).subscribe({
          next: result => this.handleOnSubmitResult(result),
          error: error => this.handleOnSubmitError(error),
          complete: () => dialogDelete.close()
        });
      }
    });
  }

  handleOnSubmitResult(result: MutationResult) {
    if (result.Success) {
      this.filterProducts();
    } else {
      this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
    }
  }

  handleOnSubmitError(error: string) {
    this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
  }
}