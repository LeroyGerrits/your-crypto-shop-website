import { AuthenticationService } from 'src/app/shared/services/-authentication.service';
import { Component } from '@angular/core';
import { Merchant } from 'src/app/shared/models/-merchant.model';

@Component({
    selector: 'account-settings',
    templateUrl: './settings.component.html'
})

export class AccountSettingsComponent {
    public activeMerchant?: Merchant | null;

    constructor(
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.merchant.subscribe(x => this.activeMerchant = x?.Merchant);
    }
}