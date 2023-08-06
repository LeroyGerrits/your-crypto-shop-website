import { Component } from '@angular/core';
import { Customer } from '../../shared/models/Customer.model'

@Component({
  selector: 'control-panel-customer',
  templateUrl: './customer.component.html'
})

export class CustomerComponent {
  public customer: Customer = new Customer();
}