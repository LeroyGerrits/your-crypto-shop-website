import { AuthenticationService } from './shared/services/Authentication.service';
import { Component } from '@angular/core';
import { Merchant } from './shared/models/Merchant.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  public activeMerchant?: Merchant | null;
  public currentYear: number = new Date().getFullYear();

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.merchant.subscribe(x => this.activeMerchant = x?.Merchant);
  }

  logout() {
    this.authenticationService.logout();
  }
}
