import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { DialogSignUpComponent } from '../shared/dialogs/signup/dialog.signup.component';
import { MatDialog } from '@angular/material/dialog';
import { Shop } from '../shared/models/Shop.model';
import { ShopService } from '../shared/services/Shop.service';

@Component({
  selector: 'public-website',
  templateUrl: './public-website.component.html'
})
export class PublicWebsiteComponent implements OnInit {
  public showCallToAction: boolean = false;
  public featuredShops: Shop[] | undefined;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private shopService: ShopService) { }

  ngOnInit() {
    this.shopService.getListFeaturedPublic().subscribe(shops => this.featuredShops = shops);

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