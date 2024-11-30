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
import { OrderStatus } from 'src/app/shared/enums/order-status.enum';
import { Environment } from 'src/app/shared/environments/environment';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { Order } from 'src/app/shared/models/order.model';
import { GetOrdersParameters } from 'src/app/shared/models/parameters/get-orders-parameters.model';
import { Shop } from 'src/app/shared/models/shop.model';
import { OrderService } from 'src/app/shared/services/order.service';
import { ShopService } from 'src/app/shared/services/shop.service';

@Component({
    templateUrl: './order-list.component.html',
    styleUrl: './order-list.component.scss',
    standalone: false
})

export class ControlPanelSalesOrderListComponent implements OnDestroy, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

  environment = Environment;
  constants = Constants;
  dataSource = new MatTableDataSource<Order>;
  displayedColumns: string[] = ['Date', 'Shop', 'Customer', 'Status', 'ActionButtons'];
  sortDirection: string | null = 'asc';
  finishedLoading: boolean = false;

  public form!: FormGroup;
  public controlFilterDateFrom = new FormControl('');
  public controlFilterDateUntil = new FormControl('');
  public controlFilterShop = new FormControl('');
  public controlFilterCustomer = new FormControl('');
  public controlFilterStatus = new FormControl('');

  public shops: Shop[] | undefined;
  public orderStatusType = Object.keys(OrderStatus).filter(p => isNaN(p as any));

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private orderService: OrderService,
    private shopService: ShopService
  ) {
    this.form = new FormGroup([
      this.controlFilterDateFrom,
      this.controlFilterDateUntil,
      this.controlFilterShop,
      this.controlFilterCustomer,
      this.controlFilterStatus
    ]);

    this.controlFilterDateFrom.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterOrders());
    this.controlFilterDateUntil.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterOrders());
    this.controlFilterShop.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterOrders());
    this.controlFilterCustomer.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterOrders());
    this.controlFilterStatus.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterOrders());
  }

  ngOnInit() {
    this.shopService.getList().subscribe(shops => {
      this.shops = shops;
    });

    this.filterOrders();
  }

  ngOnDestroy(): void {
    this.snackBarRef?.dismiss();
  }

  filterOrders() {
    const parameters: GetOrdersParameters = {};
    if (this.controlFilterDateFrom.value) parameters.DateFrom = new Date(this.controlFilterDateFrom.value);
    if (this.controlFilterDateUntil.value) parameters.DateUntil = new Date(this.controlFilterDateUntil.value);
    if (this.controlFilterShop.value) parameters.ShopId = this.controlFilterShop.value;
    if (this.controlFilterCustomer.value) parameters.Customer = this.controlFilterCustomer.value;
    if (this.controlFilterStatus.value) parameters.Status = <OrderStatus>parseInt(this.controlFilterStatus.value);

    this.orderService.getList(parameters).subscribe(orders => {
      this.dataSource = new MatTableDataSource(orders);
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

  editElement(element: Order) {
    this.router.navigate([`/control-panel/sales/orders/${element.Id}/${this.controlFilterShop.value}`]);
  }

  handleOnSubmitResult(result: MutationResult) {
    if (result.Success) {
      this.filterOrders();
    } else {
      this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
    }
  }

  handleOnSubmitError(error: string) {
    this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
  }
}