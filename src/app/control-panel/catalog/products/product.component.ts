import { Component } from '@angular/core';
import { Product } from 'src/app/shared/models/Product.model';

@Component({
  selector: 'control-panel-catalog-product',
  templateUrl: './product.component.html'
})

export class ControlPanelCatalogProductComponent {
  public product: Product = new Product();
}
