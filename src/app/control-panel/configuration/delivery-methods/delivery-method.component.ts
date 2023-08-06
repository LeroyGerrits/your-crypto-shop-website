import { Component } from '@angular/core';
import { DeliveryMethod } from '../../../shared/models/DeliveryMethod.model'

@Component({
  selector: 'control-panel-configuration-delivery-method',
  templateUrl: './delivery-method.component.html'
})

export class DeliveryMethodComponent {
  public deliveryMethod: DeliveryMethod = new DeliveryMethod();
}