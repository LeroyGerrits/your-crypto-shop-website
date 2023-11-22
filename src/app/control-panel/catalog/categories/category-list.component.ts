import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { Category } from 'src/app/shared/models/Category.model';
import { CategoryService } from 'src/app/shared/services/Category.service';
import { ControlPanelCatalogCategoryComponent } from './category.component';
import { DialogDeleteComponent } from 'src/app/shared/dialogs/delete/dialog.delete.component';
import { GetCategoriesParameters } from 'src/app/shared/models/parameters/GetCategoriesParameters.model';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Shop } from 'src/app/shared/models/Shop.model';
import { ShopService } from 'src/app/shared/services/Shop.service';

@Component({
  selector: 'control-panel-catalog-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class ControlPanelCatalogCategoryListComponent implements OnInit, OnDestroy {
  public treeControl = new NestedTreeControl<Category>(category => category.Children);
  public dataSource = new MatTreeNestedDataSource<Category>();

  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

  public formLoading: boolean = false;
  public form!: FormGroup;
  public changingParent: boolean = false;
  public changingParentCategory: Category | undefined;
  public changingParentSelection: string | undefined;

  public controlFilterShop = new FormControl({ value: '', disabled: this.formLoading });
  public categories: Category[] | undefined;
  public shops: Shop[] | undefined;
  public selectedShop: Shop | undefined;
  public finishedLoading: boolean = false;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private categoryService: CategoryService,
    private shopService: ShopService
  ) {
    this.form = new FormGroup([
      this.controlFilterShop
    ]);
  }

  ngOnInit() {
    this.shopService.getList().subscribe(shops => {
      this.shops = shops;

      if (shops && shops[0]) {
        this.retrieveCategoriesByShopId(shops[0].Id);
        this.controlFilterShop.setValue(shops[0].Id);
      } else {
        this.finishedLoading = true;
      }
    });
  }

  ngOnDestroy() {
    this.snackBarRef?.dismiss();
  }

  hasChild = (_: number, category: Category) => !!category.Children && category.Children.length > 0;

  retrieveCategoriesByShopId(shopId: any) {
    this.formLoading = true;

    const parameters: GetCategoriesParameters = {};
    if (shopId) {
      parameters.ShopId = shopId;
      this.selectedShop = this.shops!.filter(shop => shop.Id == shopId)[0];
    }

    this.categoryService.getList(parameters).subscribe(categories => {
      this.categories = categories;
      this.formLoading = false;
      this.dataSource.data = categories;
      this.finishedLoading = true;
    });
  }

  addCategory(category?: Category) {
    const dialogCategory = this.dialog.open(ControlPanelCatalogCategoryComponent, {
      data: { parentCategory: category, selectedShop: this.selectedShop }
    });

    dialogCategory.afterClosed().subscribe(_ => {
      this.retrieveCategoriesByShopId(this.controlFilterShop.value)
    });
  }

  editCategory(category: Category) {
    const dialogCategory = this.dialog.open(ControlPanelCatalogCategoryComponent, {
      data: { categoryToEdit: category, selectedShop: this.selectedShop }
    });

    dialogCategory.afterClosed().subscribe(_ => {
      this.retrieveCategoriesByShopId(this.controlFilterShop.value)
    });
  }

  moveCategoryUp(category: Category) {
    this.categoryService.moveUp(category.Id).subscribe({
      next: result => this.handleOnSubmitResult(result),
      error: error => this.handleOnSubmitError(error)
    });
  }

  moveCategoryDown(category: Category) {
    this.categoryService.moveDown(category.Id).subscribe({
      next: result => this.handleOnSubmitResult(result),
      error: error => this.handleOnSubmitError(error)
    });
  }

  changeCategoryParent(category: Category) {
    this.changingParent = true;
    this.changingParentCategory = category;

    if (category.ParentId)
      this.changingParentSelection = category.ParentId;
  }

  changeCategoryParentCancel() {
    this.changingParent = false;
    this.changingParentCategory = undefined;
    this.changingParentSelection = undefined;
  }

  changeCategoryParentSave() {
    if (!this.changingParentCategory || !this.changingParentSelection)
      return;

    this.categoryService.changeParent(this.changingParentCategory?.Id, this.changingParentSelection).subscribe({
      next: result => this.handleOnSubmitResult(result),
      error: error => this.handleOnSubmitError(error),
      complete: () => {
        this.changingParent = false;
        this.changingParentCategory = undefined;
        this.changingParentSelection = undefined;
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
    if (result.Success) {
      this.retrieveCategoriesByShopId(this.controlFilterShop.value)
    } else {
      this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
    }
  }

  handleOnSubmitError(error: string) {
    this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
  }
}