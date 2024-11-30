import { Component, Input } from '@angular/core';

@Component({
    selector: 'dialog-confirm',
    templateUrl: 'dialog.confirm.component.html',
    standalone: false
})
export class DialogConfirmComponent {
  @Input() dialogMessage: string = '';
}