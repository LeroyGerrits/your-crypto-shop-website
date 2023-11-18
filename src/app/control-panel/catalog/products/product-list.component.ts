import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Constants } from 'src/app/shared/Constants';
import { DialogDeleteComponent } from 'src/app/shared/dialogs/delete/dialog.delete.component';
import { Environment } from 'src/app/shared/environments/Environment';
import { Category } from 'src/app/shared/models/Category.model';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Product } from 'src/app/shared/models/Product.model';
import { Shop } from 'src/app/shared/models/Shop.model';
import { GetProductsParameters } from 'src/app/shared/models/parameters/GetProductsParameters.model';
import { CategoryService } from 'src/app/shared/services/Category.service';
import { ProductService } from 'src/app/shared/services/Product.service';
import { ShopService } from 'src/app/shared/services/Shop.service';

@Component({
  selector: 'control-panel-catalog-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})

export class ControlPanelCatalogProductListComponent {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

  environment = Environment;
  constants = Constants;
  dataSource = new MatTableDataSource<Product>;
  displayedColumns: string[] = ['Photo', 'Name', 'Stock', 'Price', 'ActionButtons'];
  sortDirection: string | null = 'asc';
  finishedLoading: boolean = false;

  public form!: FormGroup;
  public controlFilterName = new FormControl('');
  public controlFilterShop = new FormControl('');
  public controlFilterCategory = new FormControl('');

  public shops: Shop[] | undefined;
  public categories: Category[] | undefined;

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private productService: ProductService,
    private shopService: ShopService
  ) {
    this.form = new FormGroup([
      this.controlFilterName,
      this.controlFilterShop,
      this.controlFilterCategory
    ]);

    this.controlFilterName.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterProducts());
    this.controlFilterCategory.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterProducts());
  }

  ngOnInit() {
    this.shopService.getList().subscribe(shops => {
      this.shops = shops;

      if (shops && shops[0]) {
        this.filterProducts();
        this.controlFilterShop.setValue(shops[0].Id);
      } else {
        this.finishedLoading = true;
      }
    });

    this.categoryService.getList().subscribe(categories => {
      this.categories = categories;
      // Construct dictionary here for filter dropdown
    });
  }

  ngOnDestroy(): void {
    this.snackBarRef?.dismiss();
  }

  filterProducts() {
    const parameters: GetProductsParameters = {
      Name: this.controlFilterName.value!,
      ShopId: this.controlFilterShop.value!
    };

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
    this.router.navigate([`/control-panel/catalog/products/${element.Id}`]);
  }

  editPhotos(element: Product) {
    this.router.navigate([`/control-panel/catalog/products/${element.Id}/photos`]);
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
      this.router.navigate(['/control-panel/catalog/products']);
    } else {
      this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
    }
  }

  handleOnSubmitError(error: string) {
    this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
  }
}