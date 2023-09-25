import { RouterModule, Routes } from '@angular/router';

import { AccountChangePasswordComponent } from './account/change-password/change-password.component';
import { AccountComponent } from './account/account.component';
import { AccountDashboardComponent } from './account/dashboard/dashboard.component';
import { AccountSettingsComponent } from './account/settings/settings.component';
import { Constants } from './shared/Constants';
import { ControlPanelCatalogCategoryComponent } from './control-panel/catalog/categories/category.component';
import { ControlPanelCatalogCategoryListComponent } from './control-panel/catalog/categories/category-list.component';
import { ControlPanelCatalogProductComponent } from './control-panel/catalog/products/product.component';
import { ControlPanelCatalogProductListComponent } from './control-panel/catalog/products/product-list.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { ControlPanelConfigurationDeliveryMethodComponent } from './control-panel/configuration/delivery-methods/delivery-method.component';
import { ControlPanelConfigurationDeliveryMethodListComponent } from './control-panel/configuration/delivery-methods/delivery-method-list.component';
import { ControlPanelConfigurationDigiByteWalletComponent } from './control-panel/configuration/digibyte-wallets/digibyte-wallet.component';
import { ControlPanelConfigurationDigiByteWalletListComponent } from './control-panel/configuration/digibyte-wallets/digibyte-wallet-list.component';
import { ControlPanelConfigurationShopComponent } from './control-panel/configuration/shops/shop.component';
import { ControlPanelConfigurationShopListComponent } from './control-panel/configuration/shops/shop-list.component';
import { ControlPanelDashboardComponent } from './control-panel/dashboard/dashboard.component';
import { ControlPanelSalesOrderComponent } from './control-panel/sales/orders/order.component';
import { ControlPanelSalesOrderListComponent } from './control-panel/sales/orders/order-list.component';
import { ControlPanelSalesTransactionComponent } from './control-panel/sales/transactions/transaction.component';
import { ControlPanelSalesTransactionListComponent } from './control-panel/sales/transactions/transaction-list.component';
import { CustomerComponent } from './control-panel/customers/customer.component';
import { CustomerListComponent } from './control-panel/customers/customer-list.component';
import { MerchantAuthorizedGuard } from './shared/guards/merchant-authorized.guard';
import { NgModule } from '@angular/core';
import { PublicWebsiteAboutComponent } from './public-website/about/about.component';
import { PublicWebsiteComponent } from './public-website/public-website.component';
import { PublicWebsiteFaqComponent } from './public-website/faq/faq.component';
import { PublicWebsiteFaqListComponent } from './public-website/faq/faq-list.component';
import { PublicWebsiteFinancialStatementComponent } from './public-website/financial-statement/financial-statement.component';
import { PublicWebsiteIndexComponent } from './public-website/index/index.component';
import { PublicWebsiteNewsComponent } from './public-website/news/news.component';
import { PublicWebsiteNewsListComponent } from './public-website/news/news-list.component';
import { PublicWebsiteNotAuthorizedComponent } from './public-website/not-authorized/not-authorized.component';
import { PublicWebsiteNotFoundComponent } from './public-website/not-found/not-found.component';
import { PublicWebsitePricingComponent } from './public-website/pricing/pricing.component';
import { PublicWebsiteResetPasswordComponent } from './public-website/reset-password/reset-password.component';
import { PublicWebsiteShopListComponent } from './public-website/shops/shop-list.component';

const routes: Routes = [
  {
    path: 'account', component: AccountComponent, canActivate: [MerchantAuthorizedGuard], title: `${Constants.TITLE_PREFIX} - Account`, children: [
      { path: '', component: AccountDashboardComponent, title: `${Constants.TITLE_PREFIX} - Account dashboard` },
      { path: 'settings', component: AccountSettingsComponent, title: `${Constants.TITLE_PREFIX} - Settings` },
      { path: 'change-password', component: AccountChangePasswordComponent, title: `${Constants.TITLE_PREFIX} - Change password` }
    ]
  },
  {
    path: 'control-panel', component: ControlPanelComponent, canActivate: [MerchantAuthorizedGuard], title: `${Constants.TITLE_PREFIX} - Control panel`, children: [
      { path: '', component: ControlPanelDashboardComponent, title: `${Constants.TITLE_PREFIX} - Control panel Dashboard` },
      { path: 'catalog/categories', component: ControlPanelCatalogCategoryListComponent, title: `${Constants.TITLE_PREFIX} - Categories` },
      { path: 'catalog/categories/:categoryId', component: ControlPanelCatalogCategoryComponent, title: `${Constants.TITLE_PREFIX} - Categories` },
      { path: 'catalog/products', component: ControlPanelCatalogProductListComponent, title: `${Constants.TITLE_PREFIX} - Products` },
      { path: 'catalog/products/:productId', component: ControlPanelCatalogProductComponent, title: `${Constants.TITLE_PREFIX} - Products` },
      { path: 'configuration/delivery-methods', component: ControlPanelConfigurationDeliveryMethodListComponent, title: `${Constants.TITLE_PREFIX} - Delivery methods` },
      { path: 'configuration/delivery-methods/:deliveryMethodId', component: ControlPanelConfigurationDeliveryMethodComponent, title: `${Constants.TITLE_PREFIX} - Delivery methods` },
      { path: 'configuration/digibyte-wallets', component: ControlPanelConfigurationDigiByteWalletListComponent, title: `${Constants.TITLE_PREFIX} - DigiByte wallets` },
      { path: 'configuration/digibyte-wallets/:digiBytewalletId', component: ControlPanelConfigurationDigiByteWalletComponent, title: `${Constants.TITLE_PREFIX} - DigiByte wallets` },
      { path: 'configuration/shops', component: ControlPanelConfigurationShopListComponent, title: `${Constants.TITLE_PREFIX} - Shops` },
      { path: 'configuration/shops/:shopId', component: ControlPanelConfigurationShopComponent, title: `${Constants.TITLE_PREFIX} - Shops` },
      { path: 'customers', component: CustomerListComponent, title: `${Constants.TITLE_PREFIX} - Customers` },
      { path: 'customers/:orderId', component: CustomerComponent, title: `${Constants.TITLE_PREFIX} - Customers` },
      { path: 'sales/orders', component: ControlPanelSalesOrderListComponent, title: `${Constants.TITLE_PREFIX} - Orders` },
      { path: 'sales/orders/:orderId', component: ControlPanelSalesOrderComponent, title: `${Constants.TITLE_PREFIX} - Orders` },
      { path: 'sales/transactions', component: ControlPanelSalesTransactionListComponent, title: `${Constants.TITLE_PREFIX} - Transactions` },
      { path: 'sales/transactions/:transactionId', component: ControlPanelSalesTransactionComponent, title: `${Constants.TITLE_PREFIX} - Transactions` }
    ]
  },
  {
    path: '', component: PublicWebsiteComponent, title: Constants.TITLE_PREFIX, children: [
      { path: '', component: PublicWebsiteIndexComponent },
      { path: 'about', component: PublicWebsiteAboutComponent, title: `${Constants.TITLE_PREFIX} - About` },
      { path: 'financial-statement', component: PublicWebsiteFinancialStatementComponent, title: `${Constants.TITLE_PREFIX} - Financial statement` },
      { path: 'news', component: PublicWebsiteNewsListComponent, title: `${Constants.TITLE_PREFIX} - News` },
      { path: 'news/:newsMessageId', component: PublicWebsiteNewsComponent, title: `${Constants.TITLE_PREFIX} - News` },
      { path: 'news/:newsMessageId/:newsMessageTitle', component: PublicWebsiteNewsComponent, title: `${Constants.TITLE_PREFIX} - News` },
      { path: 'not-authorized', component: PublicWebsiteNotAuthorizedComponent, title: `${Constants.TITLE_PREFIX} - Not authorized` },
      { path: 'pricing', component: PublicWebsitePricingComponent, title: `${Constants.TITLE_PREFIX} - Pricing` },
      { path: 'faq', component: PublicWebsiteFaqListComponent, title: `${Constants.TITLE_PREFIX} - FAQ` },
      { path: 'faq/:faqId', component: PublicWebsiteFaqComponent, title: `${Constants.TITLE_PREFIX} - FAQ` },
      { path: 'faq/:faqId/:faqTitle', component: PublicWebsiteFaqComponent, title: `${Constants.TITLE_PREFIX} - FAQ` },
      { path: 'shops', component: PublicWebsiteShopListComponent, title: `${Constants.TITLE_PREFIX} - Shops` },
      { path: 'reset-password', component: PublicWebsiteResetPasswordComponent, title: `${Constants.TITLE_PREFIX} - Reset password` },
      { path: '**', pathMatch: 'full', component: PublicWebsiteNotFoundComponent, title: `${Constants.TITLE_PREFIX} - Not found` }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }