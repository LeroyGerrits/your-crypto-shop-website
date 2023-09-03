import { AuthenticationService } from 'src/app/shared/services/Authentication.service';
import { Component } from '@angular/core';
import { Constants } from 'src/app/shared/Constants';
import { DatePipe } from '@angular/common';
import { Merchant } from 'src/app/shared/models/Merchant.model';
import { Router } from '@angular/router';

@Component({
  selector: 'control-panel-dashboard',
  templateUrl: './dashboard.component.html'
})

export class ControlPanelDashboardComponent {
  activeMerchant: Merchant = new Merchant;
  constants = Constants;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.activeMerchant = this.authenticationService.authenticatedMerchant?.Merchant!;
  }
}