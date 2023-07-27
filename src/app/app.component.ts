import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  public currentYear: number = new Date().getFullYear();
  public isMerchant: boolean = true;
}
