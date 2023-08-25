import { Category } from 'src/app/shared/models/Category.mode.model';
import { Component } from '@angular/core';

@Component({
  selector: 'control-panel-catalog-category',
  templateUrl: './category.component.html'
})

export class ControlPanelCatalogCategoryComponent {
  public category: Category = new Category();
}