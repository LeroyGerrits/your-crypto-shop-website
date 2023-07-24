import { Component } from '@angular/core';
import { Shop } from '../../shared/models/Shop.model'

@Component({
  selector: 'control-panel-category',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})

export class ShopComponent {
  public shop: Shop = new Shop();
}