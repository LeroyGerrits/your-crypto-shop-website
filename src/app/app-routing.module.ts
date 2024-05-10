import { RouterModule, Routes } from '@angular/router';

import { AccountChangePasswordComponent } from './account/change-password/change-password.component';
import { AccountComponent } from './account/account.component';
import { AccountSettingsComponent } from './account/settings/settings.component';
import { Constants } from './shared/Constants';
import { ControlPanelCatalogCategoryComponent } from './control-panel/catalog/categories/category.component';
import { ControlPanelCatalogCategoryListComponent } from './control-panel/catalog/categories/category-list.component';
import { ControlPanelCatalogProductComponent } from './control-panel/catalog/products/product.component';
import { ControlPanelCatalogProductListComponent } from './control-panel/catalog/products/product-list.component';
import { ControlPanelCatalogProductPhotoListComponent } from './control-panel/catalog/products/product-photos/product-photo-list.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { ControlPanelConfigurationDeliveryMethodComponent } from './control-panel/configuration/delivery-methods/delivery-method.component';
import { ControlPanelConfigurationDeliveryMethodListComponent } from './control-panel/configuration/delivery-methods/delivery-method-list.component';
import { ControlPanelConfigurationDigiByteWalletComponent } from './control-panel/configuration/digibyte-wallets/digibyte-wallet.component';
import { ControlPanelConfigurationDigiByteWalletListComponent } from './control-panel/configuration/digibyte-wallets/digibyte-wallet-list.component';
import { ControlPanelConfigurationFieldComponent } from './control-panel/configuration/fields/field.component';
import { ControlPanelConfigurationFieldListComponent } from './control-panel/configuration/fields/field-list.component';
import { ControlPanelConfigurationPageComponent } from './control-panel/configuration/pages/page.component';
import { ControlPanelConfigurationPageListComponent } from './control-panel/configuration/pages/page-list.component';
import { ControlPanelConfigurationShopComponent } from './control-panel/configuration/shops/shop.component';
import { ControlPanelConfigurationShopListComponent } from './control-panel/configuration/shops/shop-list.component';
import { ControlPanelCustomerComponent } from './control-panel/customers/customer.component';
import { ControlPanelCustomerListComponent } from './control-panel/customers/customer-list.component';
import { ControlPanelDashboardComponent } from './control-panel/dashboard/dashboard.component';
import { ControlPanelSalesOrderComponent } from './control-panel/sales/orders/order.component';
import { ControlPanelSalesOrderListComponent } from './control-panel/sales/orders/order-list.component';
import { ControlPanelSalesTransactionComponent } from './control-panel/sales/transactions/transaction.component';
import { ControlPanelSalesTransactionListComponent } from './control-panel/sales/transactions/transaction-list.component';
import { MerchantAuthorizedGuard } from './shared/guards/merchant-authorized.guard';
import { NgModule } from '@angular/core';
import { PublicWebsiteAboutComponent } from './public-website/about/about.component';
import { PublicWebsiteAccountActivateComponent } from './public-website/account-activate/account-activate.component';
import { PublicWebsiteComponent } from './public-website/public-website.component';
import { PublicWebsiteFaqComponent } from './public-website/faq/faq.component';
import { PublicWebsiteFaqListComponent } from './public-website/faq/faq-list.component';
import { PublicWebsiteFinancialStatementComponent } from './public-website/financial-statement/financial-statement.component';
import { PublicWebsiteIndexComponent } from './public-website/index/index.component';
import { PublicWebsiteMerchantComponent } from './public-website/merchant/merchant.component';
import { PublicWebsiteMessageComponent } from './public-website/message/message.component';
import { PublicWebsiteNewsComponent } from './public-website/news/news.component';
import { PublicWebsiteNewsListComponent } from './public-website/news/news-list.component';
import { PublicWebsiteNodeStatusComponent } from './public-website/node-status/node-status.component';
import { PublicWebsiteNotAuthorizedComponent } from './public-website/not-authorized/not-authorized.component';
import { PublicWebsiteNotFoundComponent } from './public-website/not-found/not-found.component';
import { PublicWebsitePricingComponent } from './public-website/pricing/pricing.component';
import { PublicWebsiteResetPasswordComponent } from './public-website/reset-password/reset-password.component';
import { PublicWebsiteShopListComponent } from './public-website/shops/shop-list.component';

const routes: Routes = [
  {
    path: 'account', component: AccountComponent, canActivate: [MerchantAuthorizedGuard], title: `${Constants.TITLE_PREFIX} - Account`, children: [
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
      { path: 'catalog/products/:productId/:shopId', component: ControlPanelCatalogProductComponent, title: `${Constants.TITLE_PREFIX} - Products` },
      { path: 'catalog/products/:productId/:shopId/photos', component: ControlPanelCatalogProductPhotoListComponent, title: `${Constants.TITLE_PREFIX} - Product photos` },
      { path: 'configuration/delivery-methods', component: ControlPanelConfigurationDeliveryMethodListComponent, title: `${Constants.TITLE_PREFIX} - Delivery methods` },
      { path: 'configuration/delivery-methods/:deliveryMethodId', component: ControlPanelConfigurationDeliveryMethodComponent, title: `${Constants.TITLE_PREFIX} - Delivery methods` },
      { path: 'configuration/digibyte-wallets', component: ControlPanelConfigurationDigiByteWalletListComponent, title: `${Constants.TITLE_PREFIX} - DigiByte wallets` },
      { path: 'configuration/digibyte-wallets/:digiByteWalletId', component: ControlPanelConfigurationDigiByteWalletComponent, title: `${Constants.TITLE_PREFIX} - DigiByte wallets` },
      { path: 'configuration/fields', component: ControlPanelConfigurationFieldListComponent, title: `${Constants.TITLE_PREFIX} - Fields` },
      { path: 'configuration/fields/:fieldId', component: ControlPanelConfigurationFieldComponent, title: `${Constants.TITLE_PREFIX} - Fields` },
      { path: 'configuration/pages', component: ControlPanelConfigurationPageListComponent, title: `${Constants.TITLE_PREFIX} - Pages` },
      { path: 'configuration/pages/:pageId', component: ControlPanelConfigurationPageComponent, title: `${Constants.TITLE_PREFIX} - Pages` },
      { path: 'configuration/shops', component: ControlPanelConfigurationShopListComponent, title: `${Constants.TITLE_PREFIX} - Shops` },
      { path: 'configuration/shops/:shopId', component: ControlPanelConfigurationShopComponent, title: `${Constants.TITLE_PREFIX} - Shops` },
      { path: 'customers', component: ControlPanelCustomerListComponent, title: `${Constants.TITLE_PREFIX} - Customers` },
      { path: 'customers/:customerId/:shopId', component: ControlPanelCustomerComponent, title: `${Constants.TITLE_PREFIX} - Customers` },
      { path: 'customers/:customerId/:shopId/orders', component: ControlPanelCustomerComponent, title: `${Constants.TITLE_PREFIX} - Customer orders` },
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
      { path: 'account-activate/:merchantId/:merchantPassword', component: PublicWebsiteAccountActivateComponent, title: `${Constants.TITLE_PREFIX} - Activate account` },
      { path: 'financial-statement', component: PublicWebsiteFinancialStatementComponent, title: `${Constants.TITLE_PREFIX} - Financial statement` },
      { path: 'news', component: PublicWebsiteNewsListComponent, title: `${Constants.TITLE_PREFIX} - News` },
      { path: 'news/:newsMessageId', component: PublicWebsiteNewsComponent, title: `${Constants.TITLE_PREFIX} - News` },
      { path: 'news/:newsMessageId/:newsMessageTitle', component: PublicWebsiteNewsComponent, title: `${Constants.TITLE_PREFIX} - News` },
      { path: 'not-authorized', component: PublicWebsiteNotAuthorizedComponent, title: `${Constants.TITLE_PREFIX} - Not authorized` },
      { path: 'node-status', component: PublicWebsiteNodeStatusComponent, title: `${Constants.TITLE_PREFIX} - Node status` },
      { path: 'pricing', component: PublicWebsitePricingComponent, title: `${Constants.TITLE_PREFIX} - Pricing` },
      { path: 'faq', component: PublicWebsiteFaqListComponent, title: `${Constants.TITLE_PREFIX} - FAQ` },
      { path: 'faq/:faqId', component: PublicWebsiteFaqComponent, title: `${Constants.TITLE_PREFIX} - FAQ` },
      { path: 'faq/:faqId/:faqTitle', component: PublicWebsiteFaqComponent, title: `${Constants.TITLE_PREFIX} - FAQ` },
      { path: 'merchant/:merchantId', component: PublicWebsiteMerchantComponent, title: `${Constants.TITLE_PREFIX} - Merchants` },
      { path: 'message/:messageType', component: PublicWebsiteMessageComponent, title: Constants.TITLE_PREFIX },
      { path: 'shops', component: PublicWebsiteShopListComponent, title: `${Constants.TITLE_PREFIX} - Shops` },
      { path: 'reset-password/:id/:key', component: PublicWebsiteResetPasswordComponent, title: `${Constants.TITLE_PREFIX} - Reset password` },
      { path: '**', pathMatch: 'full', component: PublicWebsiteNotFoundComponent, title: `${Constants.TITLE_PREFIX} - Not found` }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }