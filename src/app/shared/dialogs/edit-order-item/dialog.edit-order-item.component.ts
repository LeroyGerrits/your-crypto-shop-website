import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { DialogData } from 'src/app/control-panel/catalog/categories/category.component';
import { Constants } from 'src/app/shared/constants';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { OrderItem } from '../../models/order-item.model';
import { OrderService } from '../../services/order.service';

@Component({
  templateUrl: 'dialog.edit-order-item.component.html',
  styleUrl: 'dialog.edit-order-item.component.scss'
})
export class DialogEditOrderItemComponent implements OnInit {
  @Input() orderId!: string;
  @Input() orderItem!: OrderItem;
  constants = Constants;

  public controlDescription = new FormControl('', Validators.required);
  public controlPrice = new FormControl('', [Validators.required, Validators.pattern(Constants.REGEX_PATTERN_DECIMAL_8)]);
  public controlAmount = new FormControl('', [Validators.required, Validators.pattern(Constants.REGEX_PATTERN_NUMBER)]);

  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

  public form!: FormGroup;
  public formLoading = false;
  public formSubmitted = false;

  public totalPrice: number = 0;

  constructor(
    private dialogRefComponent: MatDialogRef<any>,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.form = new FormGroup([
      this.controlDescription,
      this.controlPrice,
      this.controlAmount
    ]);
  }

  ngOnInit(): void {
    this.controlDescription.setValue(this.orderItem.Description);
    this.controlPrice.setValue(this.orderItem.Price.toString());
    this.controlAmount.setValue(this.orderItem.Amount.toString());
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
    orderItemToUpdate.Description = this.controlDescription.value!;
    orderItemToUpdate.Amount = parseInt(this.controlAmount.value!);
    orderItemToUpdate.Price = parseFloat(this.controlPrice.value!);

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