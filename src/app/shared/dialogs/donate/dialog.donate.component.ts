import { Component, Input } from '@angular/core';

import { Constants } from 'src/app/shared/Constants';

@Component({
  selector: 'dialog-donate',
  templateUrl: 'dialog.donate.component.html'
})
export class DialogDonateComponent {
  constants = Constants;
}