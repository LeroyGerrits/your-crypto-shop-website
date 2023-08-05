import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AboutComponent } from './public-website/about/about.component';
import { AccountComponent } from './account/account.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { DeliveryMethodService } from './shared/services/DeliveryMethod.service';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { FaqCategoryService } from './shared/services/FaqCategory.service';
import { FaqComponent } from './public-website/faq/faq.component';
import { FaqListComponent } from './public-website/faq/faq-list.component';
import { FaqService } from './shared/services/Faq.service';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { LoginComponent } from './account/login/login.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NewsListComponent } from './public-website/news/news-list.component';
import { NewsMessageService } from './shared/services/NewsMessage.service';
import { NgModule } from '@angular/core';
import { ProductComponent } from './control-panel/catalog/products/product.component';
import { ProductListComponent } from './control-panel/catalog/products/product-list.component';
import { PublicWebsiteComponent } from './public-website/public-website.component';
import { RouterModule } from '@angular/router';
import { SearchEngineFriendlyStringPipe } from './shared/pipes/searchEngineFriendlyString.pipe';
import { ShopComponent } from './control-panel/configuration/shops/shop.component';
import { ShopListComponent } from './control-panel/configuration/shops/shop-list.component';
import { ShopService } from './shared/services/Shop.service';

@NgModule({
  declarations: [
    AboutComponent,
    AccountComponent,
    AppComponent,
    ControlPanelComponent,
    FaqListComponent,
    FaqComponent,
    LoginComponent,
    NewsListComponent,
    PublicWebsiteComponent,
    ProductListComponent,
    ProductComponent,
    SearchEngineFriendlyStringPipe,
    ShopListComponent,
    ShopComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatBadgeModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DeliveryMethodService,
    FaqService,
    FaqCategoryService,
    NewsMessageService,
    ShopService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
