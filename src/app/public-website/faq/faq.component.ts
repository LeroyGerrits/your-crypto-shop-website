import { Component } from '@angular/core';
import { Faq } from 'src/app/shared/models/Faq.model';

@Component({
  selector: 'public-website-news',
  templateUrl: './faq.component.html'
})
export class FaqComponent {
  public faq: Faq = new Faq();
}
