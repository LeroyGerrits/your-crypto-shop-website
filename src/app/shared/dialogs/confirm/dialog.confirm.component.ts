import { Component, Input } from '@angular/core';

@Component({
  selector: 'dialog-confirm',
  templateUrl: 'dialog.confirm.component.html'
})
export class DialogConfirmComponent {
  @Input() dialogMessage: string = '';
}