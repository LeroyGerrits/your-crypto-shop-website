import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AccountChangePasswordComponent } from './account/change-password/change-password.component';
import { AccountComponent } from './account/account.component';
import { AccountSettingsComponent } from './account/settings/settings.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationService } from './shared/services/Authentication.service';
import { BooleanConvertPipe } from './shared/pipes/BooleanConvert.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CategoryService } from './shared/services/Category.service';
import { ControlPanelCatalogCategoryComponent } from './control-panel/catalog/categories/category.component';
import { ControlPanelCatalogCategoryListComponent } from './control-panel/catalog/categories/category-list.component';
import { ControlPanelCatalogProductComponent } from './control-panel/catalog/products/product.component';
import { ControlPanelCatalogProductListComponent } from './control-panel/catalog/products/product-list.component';
import { ControlPanelCatalogProductPhotoComponent } from './control-panel/catalog/products/product-photos/product-photo.component';
import { ControlPanelCatalogProductPhotoListComponent } from './control-panel/catalog/products/product-photos/product-photo-list.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { ControlPanelConfigurationDeliveryMethodComponent } from './control-panel/configuration/delivery-methods/delivery-method.component';
import { ControlPanelConfigurationDeliveryMethodListComponent } from './control-panel/configuration/delivery-methods/delivery-method-list.component';
import { ControlPanelConfigurationDigiByteWalletComponent } from './control-panel/configuration/digibyte-wallets/digibyte-wallet.component';
import { ControlPanelConfigurationDigiByteWalletListComponent } from './control-panel/configuration/digibyte-wallets/digibyte-wallet-list.component';
import { ControlPanelConfigurationPageComponent } from './control-panel/configuration/pages/page.component';
import { ControlPanelConfigurationPageListComponent } from './control-panel/configuration/pages/page-list.component';
import { ControlPanelConfigurationShopComponent } from './control-panel/configuration/shops/shop.component';
import { ControlPanelConfigurationShopListComponent } from './control-panel/configuration/shops/shop-list.component';
import { ControlPanelCustomerComponent } from './control-panel/customers/customer.component';
import { ControlPanelCustomerListComponent } from './control-panel/customers/customer-list.component';
import { ControlPanelDashboardComponent } from './control-panel/dashboard/dashboard.component';
import { ControlPanelSalesOrderComponent } from './control-panel/sales/orders/order.component';
import { ControlPanelSalesOrderListComponent } from './control-panel/sales/orders/order-list.component';
import { CountryService } from './shared/services/Country.service';
import { CurrencyService } from './shared/services/Currency.service';
import { CustomerService } from './shared/services/Customer.service';
import { DatePipe } from '@angular/common';
import { DeliveryMethodService } from './shared/services/DeliveryMethod.service';
import { DialogDeleteComponent } from './shared/dialogs/delete/dialog.delete.component';
import { DialogDonateComponent } from './shared/dialogs/donate/dialog.donate.component';
import { DialogForgotPasswordComponent } from './shared/dialogs/forgot-password/dialog.forgot-password.component';
import { DialogLoginComponent } from './shared/dialogs/login/dialog.login.component';
import { DialogLogoutComponent } from './shared/dialogs/logout/dialog.logout.component';
import { DialogSignUpComponent } from './shared/dialogs/signup/dialog.signup.component';
import { DigiByteNodeService } from './shared/services/DigiByteNode.service';
import { DigiByteWalletService } from './shared/services/DigiByteWallet.service';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { FaqCategoryService } from './shared/services/FaqCategory.service';
import { FaqService } from './shared/services/Faq.service';
import { FileSizePipe } from './shared/pipes/FileSize.pipe';
import { FinancialStatementTransactionService } from './shared/services/FinancialStatementTransaction.service';
import { HashRatePipe } from './shared/pipes/HashRate.pipe';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MerchantLinkComponent } from './shared/components/merchant-link/merchant-link.component';
import { MerchantPasswordResetLinkService } from './shared/services/MerchantPasswordResetLink.service';
import { MerchantService } from './shared/services/Merchant.service';
import { NewsMessageService } from './shared/services/NewsMessage.service';
import { NgModule } from '@angular/core';
import { PageCategoryService } from './shared/services/PageCategory.service';
import { PageService } from './shared/services/Page.service';
import { ProductPhotoService } from './shared/services/ProductPhoto.service';
import { ProductService } from './shared/services/Product.service';
import { PublicWebsiteAboutComponent } from './public-website/about/about.component';
import { PublicWebsiteAccountActivateComponent } from './public-website/account-activate/account-activate.component';
import { PublicWebsiteComponent } from './public-website/public-website.component';
import { PublicWebsiteFaqComponent } from './public-website/faq/faq.component';
import { PublicWebsiteFaqListComponent } from './public-website/faq/faq-list.component';
import { PublicWebsiteFinancialStatementComponent } from './public-website/financial-statement/financial-statement.component';
import { PublicWebsiteIndexComponent } from './public-website/index/index.component';
import { PublicWebsiteNewsComponent } from './public-website/news/news.component';
import { PublicWebsiteNewsListComponent } from './public-website/news/news-list.component';
import { PublicWebsiteNodeStatusComponent } from './public-website/node-status/node-status.component';
import { PublicWebsiteResetPasswordComponent } from './public-website/reset-password/reset-password.component';
import { PublicWebsiteShopListComponent } from './public-website/shops/shop-list.component';
import { QRCodeModule } from 'angularx-qrcode';
import { RouterModule } from '@angular/router';
import { SearchEngineFriendlyStringPipe } from './shared/pipes/SearchEngineFriendlyString.pipe';
import { ShopCategoryService } from './shared/services/ShopCategory.service';
import { ShopService } from './shared/services/Shop.service';
import { StatsService } from './shared/services/Stats.service';
import { StripHtmlPipe } from './shared/pipes/StripHtml.pipe';

@NgModule({
  declarations: [
    AccountComponent,
    AccountChangePasswordComponent,
    AccountSettingsComponent,
    AppComponent,
    ControlPanelComponent,
    ControlPanelCatalogCategoryListComponent,
    ControlPanelCatalogCategoryComponent,
    ControlPanelCatalogProductComponent,
    ControlPanelCatalogProductListComponent,
    ControlPanelCatalogProductPhotoListComponent,
    ControlPanelCatalogProductPhotoComponent,
    ControlPanelConfigurationDeliveryMethodListComponent,
    ControlPanelConfigurationDeliveryMethodComponent,
    ControlPanelConfigurationDigiByteWalletListComponent,
    ControlPanelConfigurationDigiByteWalletComponent,
    ControlPanelConfigurationPageListComponent,
    ControlPanelConfigurationPageComponent,
    ControlPanelConfigurationShopListComponent,
    ControlPanelConfigurationShopComponent,
    ControlPanelCustomerListComponent,
    ControlPanelCustomerComponent,
    ControlPanelDashboardComponent,
    ControlPanelSalesOrderListComponent,
    ControlPanelSalesOrderComponent,
    DialogDeleteComponent,
    DialogDonateComponent,
    DialogForgotPasswordComponent,
    DialogLoginComponent,
    DialogLogoutComponent,
    DialogSignUpComponent,
    FileSizePipe,
    HashRatePipe,
    MerchantLinkComponent,
    PublicWebsiteComponent,
    PublicWebsiteAccountActivateComponent,
    PublicWebsiteAboutComponent,
    PublicWebsiteFaqComponent,
    PublicWebsiteFaqListComponent,
    PublicWebsiteIndexComponent,
    PublicWebsiteFinancialStatementComponent,
    PublicWebsiteNewsComponent,
    PublicWebsiteNewsListComponent,
    PublicWebsiteNodeStatusComponent,
    PublicWebsiteShopListComponent,
    PublicWebsiteResetPasswordComponent,
    SearchEngineFriendlyStringPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    QRCodeModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthenticationService,
    BooleanConvertPipe,
    CategoryService,
    CountryService,
    CurrencyService,
    CustomerService,
    DatePipe,
    DeliveryMethodService,
    DigiByteNodeService,
    DigiByteWalletService,
    FaqService,
    FaqCategoryService,
    FileSizePipe,
    FinancialStatementTransactionService,
    HashRatePipe,
    MerchantService,
    MerchantPasswordResetLinkService,
    NewsMessageService,
    PageService,
    PageCategoryService,
    ProductService,
    ProductPhotoService,
    ShopService,
    ShopCategoryService,
    StatsService,
    StripHtmlPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }