import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AccountChangePasswordComponent } from './account/change-password/change-password.component';
import { AccountComponent } from './account/account.component';
import { AccountSettingsComponent } from './account/settings/settings.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationService } from './shared/services/Authentication.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CategoryService } from './shared/services/Category.service';
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
import { CurrencyService } from './shared/services/Currency.service';
import { DatePipe } from '@angular/common';
import { DeliveryMethodService } from './shared/services/DeliveryMethod.service';
import { DialogDeleteComponent } from './shared/dialogs/delete/dialog.delete.component';
import { DialogLoginComponent } from './shared/dialogs/login/dialog.login.component';
import { DialogLogoutComponent } from './shared/dialogs/logout/dialog.logout.component';
import { DialogSignUpComponent } from './shared/dialogs/signup/dialog.signup.component';
import { DigiByteWalletService } from './shared/services/DigiByteWallet.service';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { FaqCategoryService } from './shared/services/FaqCategory.service';
import { FaqService } from './shared/services/Faq.service';
import { FinancialStatementTransactionService } from './shared/services/FinancialStatementTransaction.service';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MerchantPasswordResetLinkService } from './shared/services/MerchantPasswordResetLink.service';
import { MerchantService } from './shared/services/Merchant.service';
import { NewsMessageService } from './shared/services/NewsMessage.service';
import { NgModule } from '@angular/core';
import { PublicWebsiteAboutComponent } from './public-website/about/about.component';
import { PublicWebsiteComponent } from './public-website/public-website.component';
import { PublicWebsiteFaqComponent } from './public-website/faq/faq.component';
import { PublicWebsiteFaqListComponent } from './public-website/faq/faq-list.component';
import { PublicWebsiteFinancialStatementComponent } from './public-website/financial-statement/financial-statement.component';
import { PublicWebsiteIndexComponent } from './public-website/index/index.component';
import { PublicWebsiteNewsComponent } from './public-website/news/news.component';
import { PublicWebsiteNewsListComponent } from './public-website/news/news-list.component';
import { PublicWebsiteShopListComponent } from './public-website/shops/shop-list.component';
import { QRCodeModule } from 'angularx-qrcode';
import { RouterModule } from '@angular/router';
import { SearchEngineFriendlyStringPipe } from './shared/pipes/SearchEngineFriendlyString.pipe';
import { ShopService } from './shared/services/Shop.service';
import { MerchantLinkComponent } from './shared/components/merchant-link/merchant-link.component';

@NgModule({
  declarations: [
    AccountComponent,
    AccountChangePasswordComponent,
    AccountSettingsComponent,
    AppComponent,
    ControlPanelCatalogCategoryListComponent,
    ControlPanelCatalogCategoryComponent,
    ControlPanelComponent,
    ControlPanelConfigurationDeliveryMethodListComponent,
    ControlPanelConfigurationDeliveryMethodComponent,
    ControlPanelConfigurationDigiByteWalletListComponent,
    ControlPanelConfigurationDigiByteWalletComponent,
    ControlPanelConfigurationShopListComponent,
    ControlPanelConfigurationShopComponent,
    ControlPanelDashboardComponent,
    DialogDeleteComponent,
    DialogLoginComponent,
    DialogLogoutComponent,
    DialogSignUpComponent,
    ControlPanelCatalogProductComponent,
    ControlPanelCatalogProductListComponent,    
    PublicWebsiteComponent,
    PublicWebsiteAboutComponent,
    PublicWebsiteFaqComponent,
    PublicWebsiteFaqListComponent,
    PublicWebsiteIndexComponent,
    PublicWebsiteFinancialStatementComponent,
    PublicWebsiteNewsComponent,
    PublicWebsiteNewsListComponent,    
    PublicWebsiteShopListComponent,
    SearchEngineFriendlyStringPipe,
    MerchantLinkComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatBadgeModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,    
    MatDatepickerModule,
    MatDialogModule,
    MatButtonModule,
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
    CategoryService,
    CurrencyService,
    DatePipe,
    DeliveryMethodService,
    DigiByteWalletService,
    FaqService,
    FaqCategoryService,
    FinancialStatementTransactionService,
    MerchantService,
    MerchantPasswordResetLinkService,
    NewsMessageService,
    ShopService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }