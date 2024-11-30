import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Constants } from 'src/app/shared/constants';
import { DialogConfirmComponent } from 'src/app/shared/dialogs/confirm/dialog.confirm.component';
import { DialogDeleteComponent } from 'src/app/shared/dialogs/delete/dialog.delete.component';
import { DialogEditOrderItemComponent } from 'src/app/shared/dialogs/edit-order-item/dialog.edit-order-item.component';
import { OrderStatus } from 'src/app/shared/enums/order-status.enum';
import { Environment } from 'src/app/shared/environments/environment';
import { Order } from 'src/app/shared/models/order.model';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { OrderItem } from 'src/app/shared/models/order-item.model';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
    selector: 'control-panel-sales-order',
    templateUrl: './order.component.html',
    standalone: false
})

export class ControlPanelSalesOrderComponent {
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  public environment = Environment;
  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;
  public queryStringOrderId: string | null = '';

  public form!: FormGroup;
  public formSubmitted = false;

  public controlStatus = new FormControl('', Validators.required);

  public pageTitle = 'Create new customer'
  public order: Order = new Order();
  public orderCustomerSalutation: string = '';
  public orderStatus: string = '';

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
    this.retrieveOrder();
  }

  retrieveOrder() {
    this.queryStringOrderId = this.route.snapshot.paramMap.get('orderId');

    if (this.queryStringOrderId && this.queryStringOrderId != 'new') {
      this.orderService.getById(this.queryStringOrderId).subscribe(order => {
        this.order = order;
        this.orderStatus = order.Status.toString();
        this.pageTitle = this.datePipe.transform(order.Date, 'dd-MM-yyyy HH:mm') + ` (${order.Customer.Username})`;

        this.dataSource = new MatTableDataSource(order.Items);
        this.dataSource.sort = this.sort;
      });
    }
  }

  ngOnDestroy() {
    this.snackBarRef?.dismiss();
  }

  updateStatusAwaitingPayment() {
    const dialogConfirm = this.dialog.open(DialogConfirmComponent);
    const instance = dialogConfirm.componentInstance;
    instance.dialogMessage = `Are you you want to confirm this order and send the customer a payment link? The order status will change to 'Awaiting payment' and the order can no longer be edited.`;

    dialogConfirm.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.updateStatus(this.order.Id, OrderStatus.AwaitingPayment).subscribe({
          next: result => this.handleOnSubmitResult(result),
          error: error => this.handleOnSubmitError(error),
          complete: () => dialogConfirm.close()
        });
      }
    });
  }

  updateStatusCanceled() {
    const dialogConfirm = this.dialog.open(DialogConfirmComponent);
    const instance = dialogConfirm.componentInstance;
    instance.dialogMessage = `Are you you want to cancel this order? The order status will change to 'Canceled' and the order can no longer be edited. The customer will receive an e-mail.`;

    dialogConfirm.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.updateStatus(this.order.Id, OrderStatus.Canceled).subscribe({
          next: result => this.handleOnSubmitResult(result),
          error: error => this.handleOnSubmitError(error),
          complete: () => dialogConfirm.close()
        });
      }
    });
  }

  updateStatusShipped() {
    const dialogConfirm = this.dialog.open(DialogConfirmComponent);
    const instance = dialogConfirm.componentInstance;
    instance.dialogMessage = `Are you you want to set the status of this order to 'Shipped'? The customer will receive an e-mail.`;

    dialogConfirm.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.updateStatus(this.order.Id, OrderStatus.Shipped).subscribe({
          next: result => this.handleOnSubmitResult(result),
          error: error => this.handleOnSubmitError(error),
          complete: () => dialogConfirm.close()
        });
      }
    });
  }

  updateStatusFinished() {
    const dialogConfirm = this.dialog.open(DialogConfirmComponent);
    const instance = dialogConfirm.componentInstance;
    instance.dialogMessage = `Are you you want to set the status of this order to 'Finished'? The customer will receive an e-mail.`;

    dialogConfirm.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.updateStatus(this.order.Id, OrderStatus.Finished).subscribe({
          next: result => this.handleOnSubmitResult(result),
          error: error => this.handleOnSubmitError(error),
          complete: () => dialogConfirm.close()
        });
      }
    });
  }

  editElement(element: OrderItem) {
    const dialogOrderItem = this.dialog.open(DialogEditOrderItemComponent);
    const instance = dialogOrderItem.componentInstance;
    instance.orderId = this.order.Id;
    instance.orderItem = element;

    dialogOrderItem.afterClosed().subscribe(_ => {
        this.retrieveOrder();
    });
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
      this.retrieveOrder();
    } else {
      this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
    }
  }

  handleOnSubmitError(error: string) {
    this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
  }
}