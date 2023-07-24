import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './control-panel/products/product-list.component';
import { ProductComponent } from './control-panel/products/product.component';
import { IndexComponent } from './index/index.component';
import { CategoryListComponent } from './control-panel/categories/category-list.component';
import { CategoryComponent } from './control-panel/categories/category.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'control-panel/categories', component: CategoryListComponent },
  { path: 'control-panel/categories/:productId', component: CategoryComponent },
  { path: 'control-panel/products', component: ProductListComponent },
  { path: 'control-panel/products/:productId', component: ProductComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }