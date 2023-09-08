import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { Category } from 'src/app/shared/models/Category.model';
import { CategoryService } from 'src/app/shared/services/Category.service';
import { Component } from '@angular/core';
import { ControlPanelCatalogCategoryComponent } from './category.component';
import { DialogDeleteComponent } from 'src/app/shared/dialogs/delete/dialog.delete.component';
import { GetCategoriesParameters } from 'src/app/shared/models/parameters/GetCategoriesParameters.model';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Router } from '@angular/router';
import { Shop } from 'src/app/shared/models/Shop.model';
import { ShopService } from 'src/app/shared/services/Shop.service';

@Component({
  selector: 'control-panel-catalog-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class ControlPanelCatalogCategoryListComponent {
  public treeControl = new NestedTreeControl<Category>(category => category.Children);
  public dataSource = new MatTreeNestedDataSource<Category>();

  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

  public formLoading: boolean = false;
  public form!: FormGroup;
  
  public controlFilterShop = new FormControl({ value: '', disabled: this.formLoading });
  public categories: Category[] | undefined;
  public shops: Shop[] | undefined;
  public selectedShop: Shop | undefined;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private categoryService: CategoryService,
    private shopService: ShopService
  ) {
    this.form = new FormGroup([
      this.controlFilterShop
    ]);

    this.shopService.getList().subscribe(shops => {
      this.shops = shops;

      if (shops) {
        this.retrieveCategoriesByShopId(shops[0].Id);
        this.controlFilterShop.setValue(shops[0].Id);
      }
    });
  }

  hasChild = (_: number, category: Category) => !!category.Children && category.Children.length > 0;

  retrieveCategoriesByShopId(shopId: any) {
    this.formLoading = true;

    const parameters: GetCategoriesParameters = {};
    if (shopId) parameters.ShopId = shopId;

    this.categoryService.getList(parameters).subscribe(categories => {
      this.categories = categories;
      this.formLoading = false;
      this.dataSource.data = categories;
    });
  }

  addCategory(category?: Category) {
    console.log(category);
  }

  editCategory(category: Category) {
    const dialogCategory = this.dialog.open(ControlPanelCatalogCategoryComponent, {
      data: { categoryToEdit: category, selectedShopId: this.controlFilterShop.value }
    });
    
    dialogCategory.afterClosed().subscribe(result => {
      if (result) {
        this.retrieveCategoriesByShopId(this.controlFilterShop.value)
      }
    });
  }

  deleteCategory(category: Category) {
    const dialogDelete = this.dialog.open(DialogDeleteComponent);
    const instance = dialogDelete.componentInstance;
    instance.dialogMessage = `Are you sure you want to delete category '${category.Name}'?`;

    dialogDelete.afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.delete(category.Id).subscribe({
          next: result => this.handleOnSubmitResult(result),
          error: error => this.handleOnSubmitError(error),
          complete: () => dialogDelete.close()
        });
      }
    });
  }

  handleOnSubmitResult(result: MutationResult) {
    console.log(result);
    if (result.ErrorCode == 0) {
      this.retrieveCategoriesByShopId(this.controlFilterShop.value)
    } else {
      this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
    }
  }

  handleOnSubmitError(error: string) {
    console.log(error);
    this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
  }
}