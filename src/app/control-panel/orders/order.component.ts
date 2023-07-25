import { Component } from '@angular/core';
import { Order } from '../../shared/models/Order.model'

@Component({
  selector: 'control-panel-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent {
  public order: Order = new Order();
}