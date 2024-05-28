import { Component } from '@angular/core';
import { Transaction } from 'src/app/shared/models/-transaction.model';

@Component({
  selector: 'control-panel-sales-transaction',
  templateUrl: './transaction.component.html'
})

export class ControlPanelSalesTransactionComponent {
  public transaction: Transaction = new Transaction();
}