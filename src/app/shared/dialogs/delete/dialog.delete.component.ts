import { Component, Input } from '@angular/core';

@Component({
    selector: 'dialog-delete',
    templateUrl: 'dialog.delete.component.html',
    standalone: false
})
export class DialogDeleteComponent {
  @Input() dialogMessage: string = '';
}