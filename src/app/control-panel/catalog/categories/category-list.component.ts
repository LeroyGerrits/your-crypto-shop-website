import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { Category } from 'src/app/shared/models/Category.mode.model';
import { CategoryService } from 'src/app/shared/services/Category.service';
import { Component } from '@angular/core';
import { DialogDeleteComponent } from 'src/app/dialogs/delete/dialog.delete.component';
import { GetCategoriesParameters } from 'src/app/shared/models/parameters/GetCategoriesParameters.model';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Router } from '@angular/router';
import { Shop } from 'src/app/shared/models/Shop.model';
import { ShopService } from 'src/app/shared/services/Shop.service';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
      },
    ],
  },
];

@Component({
  selector: 'control-panel-catalog-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class ControlPanelCatalogCategoryListComponent {
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

  loading: boolean = false;
  form!: FormGroup;
  controlFilterShop = new FormControl({value: '', disabled: this.loading});
  categories: Category[] | undefined;
  shops: Shop[] | undefined;
  
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
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  retrieveCategoriesByShopId(shopId: any) {
    this.loading = true;

    const parameters: GetCategoriesParameters = {};
    if (shopId) parameters.ShopId = shopId;

    this.categoryService.getList(parameters).subscribe(categories => {
      this.categories = categories;
      this.loading = false;
    });
  }

  addElement(node: FoodNode) {
    console.log(node);
    this.treeControl.expand(node);
  }

  editElement(element: FoodNode) {
    //this.router.navigate([`/control-panel/catalog/categories/${element.Id}`]);
  }

  deleteElement(element: FoodNode) {
    const dialogDelete = this.dialog.open(DialogDeleteComponent);
    const instance = dialogDelete.componentInstance;
    instance.dialogMessage = `Are you sure you want to delete category '${element.name}'?`;

    dialogDelete.afterClosed().subscribe(result => {
      if (result) {
        /*this.categoryService.delete(element.Id).subscribe({
          next: result => this.handleOnSubmitResult(result),
          error: error => this.handleOnSubmitError(error),
          complete: () => dialogDelete.close()
        });*/
      }
    });
  }

  handleOnSubmitResult(result: MutationResult) {
    if (result.ErrorCode == 0) {
      this.router.navigate(['/control-panel/catalog/categories']);
    } else {
      this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
    }
  }

  handleOnSubmitError(error: string) {
    this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
  }
}