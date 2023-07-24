import { Component } from '@angular/core';
import { Category } from '../../shared/models/Category.model'

@Component({
  selector: 'control-panel-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent {
  public category: Category = new Category();
}