import { Component, OnInit, ViewChild } from '@angular/core';
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
import { Country } from 'src/app/shared/models/Country.model';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Shop } from 'src/app/shared/models/Shop.model';
import { ShopCategory } from 'src/app/shared/models/ShopCategory.model';
import { GetShopsParameters } from 'src/app/shared/models/parameters/GetShopsParameters.model';
import { CountryService } from 'src/app/shared/services/Country.service';
import { ShopService } from 'src/app/shared/services/Shop.service';
import { ShopCategoryService } from 'src/app/shared/services/ShopCategory.service';

@Component({
  selector: 'control-panel-configuration-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrl: './shop-list.component.scss'
})

export class ControlPanelConfigurationShopListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

  environment = Environment;
  constants = Constants;
  dataSource = new MatTableDataSource<Shop>;
  displayedColumns: string[] = ['Featured', 'Name', 'SubDomain', 'Country', 'Category', 'ActionButtons'];
  sortDirection: string | null = 'asc';

  public form!: FormGroup;
  public controlFilterName = new FormControl('');
  public controlFilterSubDomain = new FormControl('');
  public controlFilterCountry = new FormControl('');
  public controlFilterShopCategory = new FormControl('');

  public countries: Country[] | undefined;
  public shopCategories: ShopCategory[] | undefined;

  constructor(
    private countryService: CountryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private shopService: ShopService,
    private shopCategoryService: ShopCategoryService
  ) {
    this.form = new FormGroup([
      this.controlFilterName,
      this.controlFilterSubDomain,
      this.controlFilterCountry,
      this.controlFilterShopCategory
    ]);

    this.controlFilterName.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterShops());
    this.controlFilterSubDomain.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterShops());
    this.controlFilterCountry.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterShops());
    this.controlFilterShopCategory.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterShops());
  }

  ngOnInit() {
    this.filterShops();
    this.countryService.getList().subscribe(countries => this.countries = countries);
    this.shopCategoryService.getList().subscribe(shopCategories => this.shopCategories = shopCategories);
  }

  filterShops() {
    const parameters: GetShopsParameters = {
      Name: this.controlFilterName.value!,
      SubDomain: this.controlFilterSubDomain.value!,
      CountryId: this.controlFilterCountry.value!,
      ShopCategoryId: this.controlFilterShopCategory.value!
    };

    this.shopService.getList(parameters).subscribe(shops => {
      this.dataSource = new MatTableDataSource(shops);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnDestroy() {
    this.snackBarRef?.dismiss();
  }

  onSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.sortDirection = sortState.direction.toString();
    } else {
      this.sortDirection = null;
    }
  }

  editElement(element: Shop) {
    this.router.navigate([`/control-panel/configuration/shops/${element.Id}`]);
  }

  deleteElement(element: Shop) {
    const dialogDelete = this.dialog.open(DialogDeleteComponent);
    const instance = dialogDelete.componentInstance;
    instance.dialogMessage = `Are you sure you want to delete shop '${element.Name}'?`;

    dialogDelete.afterClosed().subscribe(result => {
      if (result) {
        this.shopService.delete(element.Id).subscribe({
          next: result => this.handleOnSubmitResult(result),
          error: error => this.handleOnSubmitError(error),
          complete: () => dialogDelete.close()
        });
      }
    });
  }

  handleOnSubmitResult(result: MutationResult) {
    if (result.Success) {
      this.filterShops();
    } else {
      this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
    }
  }

  handleOnSubmitError(error: string) {
    this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
  }
}