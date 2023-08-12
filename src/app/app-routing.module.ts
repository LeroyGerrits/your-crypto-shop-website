import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './public-website/about/about.component';
import { AccountChangePasswordComponent } from './account/change-password/change-password.component';
import { AccountComponent } from './account/account.component';
import { AccountDashboardComponent } from './account/dashboard/dashboard.component';
import { AccountSettingsComponent } from './account/settings/settings.component';
import { CategoryComponent } from './control-panel/catalog/categories/category.component';
import { CategoryListComponent } from './control-panel/catalog/categories/category-list.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { ControlPanelConfigurationDeliveryMethodComponent } from './control-panel/configuration/delivery-methods/delivery-method.component';
import { ControlPanelConfigurationDeliveryMethodListComponent } from './control-panel/configuration/delivery-methods/delivery-method-list.component';
import { ControlPanelConfigurationDigiByteWalletComponent } from './control-panel/configuration/digibyte-wallets/digibyte-wallet.component';
import { ControlPanelConfigurationDigiByteWalletListComponent } from './control-panel/configuration/digibyte-wallets/digibyte-wallet-list.component';
import { ControlPanelConfigurationShopComponent } from './control-panel/configuration/shops/shop.component';
import { ControlPanelConfigurationShopListComponent } from './control-panel/configuration/shops/shop-list.component';
import { ControlPanelDashboardComponent } from './control-panel/dashboard/dashboard.component';
import { CustomerComponent } from './control-panel/customers/customer.component';
import { CustomerListComponent } from './control-panel/customers/customer-list.component';
import { FaqComponent } from './public-website/faq/faq.component';
import { FaqListComponent } from './public-website/faq/faq-list.component';
import { IndexComponent } from './public-website/index/index.component';
import { NewsComponent } from './public-website/news/news.component';
import { NewsListComponent } from './public-website/news/news-list.component';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found.component';
import { OrderComponent } from './control-panel/sales/orders/order.component';
import { OrderListComponent } from './control-panel/sales/orders/order-list.component';
import { PricingComponent } from './public-website/pricing/pricing.component';
import { ProductComponent } from './control-panel/catalog/products/product.component';
import { ProductListComponent } from './control-panel/catalog/products/product-list.component';
import { PublicWebsiteComponent } from './public-website/public-website.component';

const titlePrefix: string = 'DGB Commerce - ';
const routes: Routes = [
  {
    path: 'account', component: AccountComponent, title: titlePrefix + 'Account', children: [
      { path: '', component: AccountDashboardComponent, title: titlePrefix + 'Account dashboard' },
      { path: 'settings', component: AccountSettingsComponent, title: titlePrefix + 'Settings' },
      { path: 'change-password', component: AccountChangePasswordComponent, title: titlePrefix + 'Change password' }
    ]
  },
  {
    path: 'control-panel', component: ControlPanelComponent, title: titlePrefix + 'Control panel', children: [
      { path: '', component: ControlPanelDashboardComponent, title: titlePrefix + 'Control panel Dashboard' },
      { path: 'catalog/categories', component: CategoryListComponent, title: titlePrefix + 'Categories' },
      { path: 'catalog/categories/:categoryId', component: CategoryComponent, title: titlePrefix + 'Categories' },
      { path: 'catalog/products', component: ProductListComponent, title: titlePrefix + 'Products' },
      { path: 'catalog/products/:productId', component: ProductComponent, title: titlePrefix + 'Products' },
      { path: 'configuration/delivery-methods', component: ControlPanelConfigurationDeliveryMethodListComponent, title: titlePrefix + 'Delivery methods' },
      { path: 'configuration/delivery-methods/:deliveryMethodId', component: ControlPanelConfigurationDeliveryMethodComponent, title: titlePrefix + 'Delivery methods' },
      { path: 'configuration/digibyte-wallets', component: ControlPanelConfigurationDigiByteWalletListComponent, title: titlePrefix + 'DigiByte wallets' },
      { path: 'configuration/digibyte-wallets/:digibytewalletId', component: ControlPanelConfigurationDigiByteWalletComponent, title: titlePrefix + 'DigiByte wallets' },
      { path: 'configuration/shops', component: ControlPanelConfigurationShopListComponent, title: titlePrefix + 'Shops' },
      { path: 'configuration/shops/:shopId', component: ControlPanelConfigurationShopComponent, title: titlePrefix + 'Shops' },
      { path: 'customers', component: CustomerListComponent, title: titlePrefix + 'Customers' },
      { path: 'customers/:orderId', component: CustomerComponent, title: titlePrefix + 'Customers' },
      { path: 'sales/orders', component: OrderListComponent, title: titlePrefix + 'Orders' },
      { path: 'sales/orders/:orderId', component: OrderComponent, title: titlePrefix + 'Orders' },
      { path: 'sales/transactions', component: OrderListComponent, title: titlePrefix + 'Transactions' },
      { path: 'sales/transactions/:transactionId', component: OrderComponent, title: titlePrefix + 'Transactions' }]
  },
  {
    path: '', component: PublicWebsiteComponent, title: titlePrefix, children: [
      { path: '', component: IndexComponent },
      { path: 'news', component: NewsListComponent, title: titlePrefix + 'News' },
      { path: 'news/:newsMessageId', component: NewsComponent, title: titlePrefix + 'News' },
      { path: 'news/:newsMessageId/:newsMessageTitle', component: NewsComponent, title: titlePrefix + 'News' },
      { path: 'pricing', component: PricingComponent, title: titlePrefix + 'Pricing' },
      { path: 'faq', component: FaqListComponent, title: titlePrefix + 'FAQ' },
      { path: 'faq/:faqId', component: FaqComponent, title: titlePrefix + 'FAQ' },
      { path: 'faq/:faqId/:faqTitle', component: FaqComponent, title: titlePrefix + 'FAQ' },
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