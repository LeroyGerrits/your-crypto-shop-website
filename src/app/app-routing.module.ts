import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './public-website/about/about.component';
import { CategoryComponent } from './control-panel/catalog/categories/category.component';
import { CategoryListComponent } from './control-panel/catalog/categories/category-list.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { CustomerComponent } from './control-panel/customers/customer.component';
import { CustomerListComponent } from './control-panel/customers/customer-list.component';
import { DeliveryMethodComponent } from './control-panel/configuration/delivery-methods/delivery-method.component';
import { DeliveryMethodListComponent } from './control-panel/configuration/delivery-methods/delivery-method-list.component';
import { FaqComponent } from './public-website/faq/faq.component';
import { IndexComponent } from './public-website/index/index.component';
import { NewsComponent } from './public-website/news/news.component';
import { NewsListListComponent } from './public-website/news/news-list.component';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found.component';
import { OrderComponent } from './control-panel/orders/order.component';
import { OrderListComponent } from './control-panel/orders/order-list.component';
import { PricingComponent } from './public-website/pricing/pricing.component';
import { ProductComponent } from './control-panel/catalog/products/product.component';
import { ProductListComponent } from './control-panel/catalog/products/product-list.component';
import { PublicWebsiteComponent } from './public-website/public-website.component';
import { ShopComponent } from './control-panel/configuration/shops/shop.component';
import { ShopListComponent } from './control-panel/configuration/shops/shop-list.component';

const titlePrefix: string = 'DGB Commerce - ';
const routes: Routes = [

  { path: 'control-panel', component: ControlPanelComponent, title: titlePrefix + 'Control panel' },
  { path: 'control-panel/catalog/categories', component: CategoryListComponent, title: titlePrefix + 'Categories' },
  { path: 'control-panel/catalog/categories/:categoryId', component: CategoryComponent, title: titlePrefix + 'Categories' },
  { path: 'control-panel/catalog/products', component: ProductListComponent, title: titlePrefix + 'Products' },
  { path: 'control-panel/catalog/products/:productId', component: ProductComponent, title: titlePrefix + 'Products' },
  { path: 'control-panel/configuration/delivery-methods', component: DeliveryMethodListComponent, title: titlePrefix + 'Delivery methods' },
  { path: 'control-panel/configuration/delivery-methods/:deliveryMethodId', component: DeliveryMethodComponent, title: titlePrefix + 'Delivery methods' },
  { path: 'control-panel/configuration/shops', component: ShopListComponent, title: titlePrefix + 'Shops' },
  { path: 'control-panel/configuration/shops/:shopId', component: ShopComponent, title: titlePrefix + 'Shops' },
  { path: 'control-panel/customers', component: CustomerListComponent, title: titlePrefix + 'Customers' },
  { path: 'control-panel/customers/:orderId', component: CustomerComponent, title: titlePrefix + 'Customers' },
  { path: 'control-panel/orders', component: OrderListComponent, title: titlePrefix + 'Orders' },
  { path: 'control-panel/orders/:orderId', component: OrderComponent, title: titlePrefix + 'Orders' },
  {
    path: '', component: PublicWebsiteComponent, title: titlePrefix, children: [
      { path: '', component: IndexComponent },
      { path: 'news', component: NewsListListComponent, title: titlePrefix + 'News' },
      { path: 'news/:newsMessageId', component: NewsComponent, title: titlePrefix + 'News' },
      { path: 'pricing', component: PricingComponent, title: titlePrefix + 'Pricing' },
      { path: 'faq', component: FaqComponent, title: titlePrefix + 'FAQ' },
      { path: 'about', component: AboutComponent, title: titlePrefix + 'About' },
      { path: '**', pathMatch: 'full', component: NotFoundComponent, title: titlePrefix + 'Not found' }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }