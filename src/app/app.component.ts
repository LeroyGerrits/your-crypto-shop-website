import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { AuthenticationService } from './shared/services/Authentication.service';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Merchant } from './shared/models/Merchant.model';

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

  logout() {
    const dialogRef = this.dialog.open(DialogLogout);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.authenticationService.logout();
      }
    });
  }
}

@Component({
  selector: 'dialog-logout',
  templateUrl: 'dialog.logout.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogLogout { }