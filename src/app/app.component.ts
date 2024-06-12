import { AuthenticationService } from './shared/services/authentication.service';
import { Component } from '@angular/core';
import { DialogLoginComponent } from './shared/dialogs/login/dialog.login.component';
import { DialogLogoutComponent } from './shared/dialogs/logout/dialog.logout.component';
import { DialogSignUpComponent } from './shared/dialogs/signup/dialog.signup.component';
import { MatDialog } from '@angular/material/dialog';
import { Merchant } from './shared/models/merchant.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  public activeMerchant?: Merchant | null;
  public currentYear: number = new Date().getFullYear();

  constructor(public dialog: MatDialog, private authenticationService: AuthenticationService) {
    this.authenticationService.merchant.subscribe(x => this.activeMerchant = x?.Merchant);
  }

  login() {
    const dialogLogin = this.dialog.open(DialogLoginComponent);
    dialogLogin.afterClosed().subscribe(result => {
      if (result) {
        dialogLogin.close();
      }
    });
  }

  logout() {
    const dialogLogout = this.dialog.open(DialogLogoutComponent);
    dialogLogout.afterClosed().subscribe(result => {
      if (result) {
        this.authenticationService.logout();
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