import { Component } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";

@Component({
  selector: 'dialog-logout',
  templateUrl: 'dialog.logout.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogLogoutComponent { }