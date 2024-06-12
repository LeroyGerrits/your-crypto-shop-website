import { Component } from '@angular/core';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'dialog-donate',
  templateUrl: 'dialog.donate.component.html'
})
export class DialogDonateComponent {
  constants = Constants;
}