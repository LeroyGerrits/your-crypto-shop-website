import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { Component, ViewChild } from '@angular/core';
import { Constants } from 'src/app/shared/Constants';
import { DatePipe } from '@angular/common';
import { Environment } from 'src/app/shared/environments/Environment';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Order } from 'src/app/shared/models/Order.model';
import { OrderItem } from 'src/app/shared/models/OrderItem.model';
import { OrderService } from 'src/app/shared/services/Order.service';
import { ShopService } from 'src/app/shared/services/Shop.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogDeleteComponent } from 'src/app/shared/dialogs/delete/dialog.delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'control-panel-sales-order',
  templateUrl: './order.component.html'
})

export class ControlPanelSalesOrderComponent {
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  public environment = Environment;
  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;
  public queryStringOrderId: string | null = '';

  public form!: FormGroup;
  public formLoading = false;
  public formSubmitted = false;

  public controlStatus = new FormControl('', Validators.required);

  public pageTitle = 'Create new customer'
  public order: Order = new Order();
  public orderCustomerSalutation: string = '';

  constants = Constants;

  dataSource = new MatTableDataSource<OrderItem>;
  displayedColumns: string[] = ['Product', 'Amount', 'Price', 'Total', 'ActionButtons'];
  sortDirection: string | null = 'asc';

  constructor(
    private datePipe: DatePipe,
    private dialog: MatDialog,
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
      this.orderService.getById(this.queryStringOrderId).subscribe(order => {
        this.order = order;
        this.pageTitle = this.datePipe.transform(order.Date, 'dd-MM-yyyy HH:ss') + ` (${order.Customer.Username})`;

        this.dataSource = new MatTableDataSource(order.Items);
        this.dataSource.sort = this.sort;
      });
    }
  }

  ngOnDestroy() {
    this.snackBarRef?.dismiss();
  }

  editElement(element: OrderItem) {
    /*const dialogShoppingCartItem = this.dialog.open(DialogEditShoppingCartItemComponent);
    const instance = dialogShoppingCartItem.componentInstance;
    instance.shoppingCartItem = element;*/
  }

  deleteElement(element: OrderItem) {
    const dialogDelete = this.dialog.open(DialogDeleteComponent);
    const instance = dialogDelete.componentInstance;
    instance.dialogMessage = `Are you sure you want to remove '${element.Description}' from this order'?`;

    dialogDelete.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.deleteItem(this.order.Id, element.Id!).subscribe({
          next: result => this.handleOnSubmitResult(result),
          error: error => this.handleOnSubmitError(error),
          complete: () => dialogDelete.close()
        });
      }
    });
  }

  onSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.sortDirection = sortState.direction.toString();
    } else {
      this.sortDirection = null;
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