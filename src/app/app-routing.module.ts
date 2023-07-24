import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './control-panel/products/product-list.component';
import { ProductComponent } from './control-panel/products/product.component';
import { IndexComponent } from './index/index.component';
import { CategoryListComponent } from './control-panel/categories/category-list.component';
import { CategoryComponent } from './control-panel/categories/category.component';
import { DeliveryMethodListComponent } from './control-panel/delivery-methods/delivery-method-list.component';
import { DeliveryMethodComponent } from './control-panel/delivery-methods/delivery-method.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'control-panel/categories', component: CategoryListComponent },
  { path: 'control-panel/categories/:categoryId', component: CategoryComponent },
  { path: 'control-panel/delivery-methods', component: DeliveryMethodListComponent },
  { path: 'control-panel/delivery-methods/:deliveryMethodId', component: DeliveryMethodComponent },
  { path: 'control-panel/orders', component: ProductListComponent },
  { path: 'control-panel/orders/:orderId', component: ProductComponent },
  { path: 'control-panel/products', component: ProductListComponent },
  { path: 'control-panel/products/:productId', component: ProductComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }