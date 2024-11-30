import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-crypto-tag',
    templateUrl: './crypto-tag.component.html',
    standalone: false
})
export class CryptoTagComponent implements OnInit {
  @Input() cryptoCode!: string;
  @Input() cryptoName!: string;
  @Input() text?: string;

  ngOnInit() {
    if (!this.text)
      this.text = this.cryptoName;
  }
}