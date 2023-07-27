import { AboutComponent } from './public-website/about/about.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge'
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar'
import { NgModule } from '@angular/core';
import { ProductComponent } from './control-panel/catalog/products/product.component';
import { ProductListComponent } from './control-panel/catalog/products/product-list.component';
import { PublicWebsiteComponent } from './public-website/public-website.component';
import { RouterModule } from '@angular/router';
import { ShopComponent } from './control-panel/configuration/shops/shop.component';
import { ShopListComponent } from './control-panel/configuration/shops/shop-list.component';

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    ControlPanelComponent,
    PublicWebsiteComponent,
    ProductListComponent,
    ProductComponent,
    ShopListComponent,
    ShopComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTableModule,
    MatToolbarModule,
    RouterModule,

    FormsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatTableModule, MatSortModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
