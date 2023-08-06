import { Component } from '@angular/core';
import { Shop } from '../../../shared/models/Shop.model'

@Component({
  selector: 'control-panel-configuration-shop',
  templateUrl: './shop.component.html'
})

export class ShopComponent {
  public shop: Shop = new Shop();
}