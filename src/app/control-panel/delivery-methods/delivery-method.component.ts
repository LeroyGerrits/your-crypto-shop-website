import { Component } from '@angular/core';
import { DeliveryMethod } from '../../shared/models/DeliveryMethod.model'

@Component({
  selector: 'control-panel-delivery-method',
  templateUrl: './delivery-method.component.html',
  styleUrls: ['./delivery-method.component.scss']
})

export class DeliveryMethodComponent {
  public deliveryMethod: DeliveryMethod = new DeliveryMethod();
}