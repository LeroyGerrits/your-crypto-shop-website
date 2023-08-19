import { Component } from '@angular/core';
import { Order } from 'src/app/shared/models/Order.model';

@Component({
  selector: 'control-panel-sales-order',
  templateUrl: './order.component.html'
})

export class ControlPanelSalesOrderComponent {
  public order: Order = new Order();
}