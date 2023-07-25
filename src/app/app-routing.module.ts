import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './control-panel/categories/category.component';
import { CategoryListComponent } from './control-panel/categories/category-list.component';
import { DeliveryMethodComponent } from './control-panel/delivery-methods/delivery-method.component';
import { DeliveryMethodListComponent } from './control-panel/delivery-methods/delivery-method-list.component';
import { IndexComponent } from './index/index.component';
import { NgModule } from '@angular/core';
import { OrderComponent } from './control-panel/orders/order.component';
import { OrderListComponent } from './control-panel/orders/order-list.component';
import { ProductComponent } from './control-panel/products/product.component';
import { ProductListComponent } from './control-panel/products/product-list.component';
import { ShopComponent } from './control-panel/shops/shop.component';
import { ShopListComponent } from './control-panel/shops/shop-list.component';

const titlePrefix: string = 'DGB Commerce - ';
const routes: Routes = [
  { path: '', component: IndexComponent, title: titlePrefix },
  { path: 'control-panel/categories', component: CategoryListComponent, title: titlePrefix + 'Categories' },
  { path: 'control-panel/categories/:categoryId', component: CategoryComponent, title: titlePrefix + 'Categories' },
  { path: 'control-panel/delivery-methods', component: DeliveryMethodListComponent, title: titlePrefix + 'Delivery methods' },
  { path: 'control-panel/delivery-methods/:deliveryMethodId', component: DeliveryMethodComponent, title: titlePrefix + 'Delivery methods' },
  { path: 'control-panel/orders', component: OrderListComponent, title: titlePrefix + 'Orders' },
  { path: 'control-panel/orders/:orderId', component: OrderComponent, title: titlePrefix + 'Orders' },
  { path: 'control-panel/products', component: ProductListComponent, title: titlePrefix + 'Products' },
  { path: 'control-panel/products/:productId', component: ProductComponent, title: titlePrefix + 'Products' },
  { path: 'control-panel/shops', component: ShopListComponent, title: titlePrefix + 'Shops' },
  { path: 'control-panel/shops/:shopId', component: ShopComponent, title: titlePrefix + 'Shops' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }