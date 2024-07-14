import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Constants } from 'src/app/shared/constants';
import { DialogDeleteComponent } from 'src/app/shared/dialogs/delete/dialog.delete.component';
import { Environment } from 'src/app/shared/environments/environment';
import { Customer } from 'src/app/shared/models/customer.model';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { Shop } from 'src/app/shared/models/shop.model';
import { GetCustomersParameters } from 'src/app/shared/models/parameters/get-customers-parameters.model';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { ShopService } from 'src/app/shared/services/shop.service';

@Component({
  selector: 'control-panel-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})

export class ControlPanelCustomerListComponent implements OnDestroy, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

  environment = Environment;
  constants = Constants;
  dataSource = new MatTableDataSource<Customer>;
  displayedColumns: string[] = ['Username', 'EmailAddress', 'FirstName', 'LastName', 'ActionButtons'];
  sortDirection: string | null = 'asc';
  finishedLoading: boolean = false;

  public form!: FormGroup;
  public controlFilterShop = new FormControl('');
  public controlFilterUsername = new FormControl('');
  public controlFilterEmailAddress = new FormControl('');
  public controlFilterFirstName = new FormControl('');
  public controlFilterLastName = new FormControl('');

  public shops: Shop[] | undefined;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private customerService: CustomerService,
    private shopService: ShopService
  ) {
    this.form = new FormGroup([
      this.controlFilterShop,
      this.controlFilterUsername,
      this.controlFilterEmailAddress,
      this.controlFilterFirstName,
      this.controlFilterLastName
    ]);

    this.controlFilterUsername.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterCustomers());
    this.controlFilterEmailAddress.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterCustomers());
    this.controlFilterFirstName.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterCustomers());
    this.controlFilterLastName.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterCustomers());
  }

  ngOnInit() {
    this.shopService.getList().subscribe(shops => {
      this.shops = shops;

      if (shops && shops[0]) {
        this.controlFilterShop.setValue(shops[0].Id);
        this.filterCustomers();
      } else {
        this.finishedLoading = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.snackBarRef?.dismiss();
  }

  filterCustomers() {
    const parameters: GetCustomersParameters = {
      ShopId: this.controlFilterShop.value!,
      Username: this.controlFilterUsername.value!,
      EmailAddress: this.controlFilterEmailAddress.value!,
      FirstName: this.controlFilterFirstName.value!,
      LastName: this.controlFilterLastName.value!
    };

    this.customerService.getList(parameters).subscribe(customers => {
      this.dataSource = new MatTableDataSource(customers);
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

  editElement(element: Customer) {
    this.router.navigate([`/control-panel/customers/${element.Id}/${this.controlFilterShop.value}`]);
  }

  deleteElement(element: Customer) {
    const dialogDelete = this.dialog.open(DialogDeleteComponent);
    const instance = dialogDelete.componentInstance;
    instance.dialogMessage = `Are you sure you want to delete customer '${element.Username}'?`;

    dialogDelete.afterClosed().subscribe(result => {
      if (result) {
        this.customerService.delete(element.Id).subscribe({
          next: result => this.handleOnSubmitResult(result),
          error: error => this.handleOnSubmitError(error),
          complete: () => dialogDelete.close()
        });
      }
    });
  }

  handleOnSubmitResult(result: MutationResult) {
    if (result.Success) {
      this.filterCustomers();
    } else {
      this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
    }
  }

  handleOnSubmitError(error: string) {
    this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
  }
}