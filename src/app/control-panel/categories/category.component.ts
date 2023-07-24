import { Category } from '../../shared/models/Category.model'
import { Component } from '@angular/core';

@Component({
  selector: 'control-panel-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent {
  public category: Category = new Category();
}