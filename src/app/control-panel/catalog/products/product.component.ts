import { Component } from '@angular/core';
import { Product } from '../../../shared/models/Product.model'

@Component({
  selector: 'control-panel-product',
  templateUrl: './product.component.html'
})

export class ProductComponent {
  public product: Product = new Product();

  
}
