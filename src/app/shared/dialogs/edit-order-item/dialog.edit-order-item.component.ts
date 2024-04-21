import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { Constants } from 'src/app/shared/Constants';
import { MatDialogRef } from '@angular/material/dialog';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { OrderItem } from '../../models/OrderItem.model';
import { OrderService } from '../../services/Order.service';
import { ProductService } from '../../services/Product.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'dialog.edit-order-item.component.html',
  styleUrl: 'dialog.edit-order-item.component.scss'
})
export class DialogEditOrderItemComponent implements OnInit {
  @Input() orderId!: string;
  @Input() orderItem!: OrderItem;
  constants = Constants;

  public controlDescription = new FormControl('', Validators.required);
  public controlAmount = new FormControl('', [Validators.required, Validators.pattern(Constants.REGEX_PATTERN_NUMBER)]);

  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

  public form!: FormGroup;
  public formLoading = false;
  public formSubmitted = false;

  public totalPrice: number = 0;

  constructor(
    private dialogRefComponent: MatDialogRef<any>,
    private orderService: OrderService,
    private productService: ProductService,
    private router: Router,    
    private snackBar: MatSnackBar
  ) {
    this.form = new FormGroup([
      this.controlDescription,
      this.controlAmount
    ]);
  }

  ngOnInit(): void {
    //this.controlAmount.setValue(this.shoppingCartItem.Amount.toString());
  }

  minus() {
    if (this.controlAmount.value) {
      let currentValue = parseInt(this.controlAmount.value);
      this.controlAmount.setValue((currentValue - 1).toString());
      this.change();
    }
  }

  plus() {
    if (this.controlAmount.value) {
      let currentValue = parseInt(this.controlAmount.value);
      this.controlAmount.setValue((currentValue + 1).toString());
      this.change();
    }
  }

  change() {
    if (this.controlAmount.value && !this.controlAmount.errors) {
      let currentValue = parseInt(this.controlAmount.value);

      if (currentValue == 0) {
        this.controlAmount.setValue('1');
        this.change();
      }
    }
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    const orderItemToUpdate = Object.assign({}, this.orderItem)
    orderItemToUpdate.Amount = parseInt(this.controlAmount.value!);

    this.orderService.updateItem(this.orderId, orderItemToUpdate).subscribe({
      next: result => this.handleSave(result),
      error: error => this.handleError(error),
      complete: () => this.formLoading = false
    });
  }

  handleSave(result: MutationResult) {
    if (result.Success) {
      if (this.dialogRefComponent)
        this.dialogRefComponent.close();
    } else {
      this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
    }
  }

  handleError(error: string) {
    this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
    this.formLoading = false;
  }
}