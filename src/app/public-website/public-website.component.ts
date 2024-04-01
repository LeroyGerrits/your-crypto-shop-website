import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { DialogSignUpComponent } from '../shared/dialogs/signup/dialog.signup.component';
import { MatDialog } from '@angular/material/dialog';
import { ShopService } from '../shared/services/Shop.service';
import { StatsService } from '../shared/services/Stats.service';
import { Stats } from '../shared/models/Stats.model';
import { PublicShop } from '../shared/models/viewmodels/PublicShop.model';

@Component({
  selector: 'public-website',
  templateUrl: './public-website.component.html'
})
export class PublicWebsiteComponent implements OnInit {
  public showCallToAction: boolean = this.router.url == '/';
  public featuredShops: PublicShop[] | undefined;
  public stats: Stats = <Stats>{
    Merchants: 0,
    Shops: 0,
    Products: 0,
    Orders: 0
  };

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private shopService: ShopService,
    private statsService: StatsService) { }

  ngOnInit() {
    this.shopService.getListFeaturedPublic().subscribe(shops => this.featuredShops = shops);
    this.statsService.get().subscribe(stats => this.stats = stats);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showCallToAction = event.url == '/';
      }
    });
  }

  signUp() {
    const dialogSignUp = this.dialog.open(DialogSignUpComponent);
    dialogSignUp.afterClosed().subscribe(result => {
      if (result) {
        dialogSignUp.close();
      }
    });
  }
}