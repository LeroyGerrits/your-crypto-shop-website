import { Component } from '@angular/core';
import { MerchantPasswordResetLink } from 'src/app/shared/models/MerchantPasswordResetLink.model';

@Component({
  selector: 'public-website-reset-password',
  templateUrl: './reset-password.component.html'
})

export class PublicWebsiteResetPasswordComponent {
  public merchantPasswordResetLink: MerchantPasswordResetLink = new MerchantPasswordResetLink();
}
