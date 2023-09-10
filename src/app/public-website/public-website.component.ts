import { NavigationEnd, Router } from '@angular/router';

import { Component } from '@angular/core';
import { DialogSignUpComponent } from '../shared/dialogs/signup/dialog.signup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'public-website',
  templateUrl: './public-website.component.html'
})
export class PublicWebsiteComponent {
  public showCallToAction: boolean = false;

  constructor(
    public dialog: MatDialog,
    private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showCallToAction = event.url == '/';
      }
    });
  }

  signUp(){
    const dialogSignUp = this.dialog.open(DialogSignUpComponent);
    dialogSignUp.afterClosed().subscribe(result => {
      if (result) {
        dialogSignUp.close();
      }
    });
  }
}