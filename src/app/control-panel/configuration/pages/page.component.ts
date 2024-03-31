import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { Constants } from 'src/app/shared/Constants';
import { Environment } from 'src/app/shared/environments/Environment';
import { GetPageResponse } from 'src/app/shared/models/response/GetPageResponse.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MutatePageRequest } from 'src/app/shared/models/request/MutatePageRequest.model';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Page } from 'src/app/shared/models/Page.model';
import { PageCategory } from 'src/app/shared/models/PageCategory.model';
import { PageCategoryService } from 'src/app/shared/services/PageCategory.service';
import { PageService } from 'src/app/shared/services/Page.service';
import { Shop } from 'src/app/shared/models/Shop.model';
import { ShopService } from 'src/app/shared/services/Shop.service';

@Component({
  selector: 'control-panel-catalog-page',
  templateUrl: './page.component.html'
})

export class ControlPanelConfigurationPageComponent implements OnInit, OnDestroy {
  public environment = Environment;
  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;
  public queryStringPageId: string | null = '';
  public queryStringShopId: string | null = '';

  public form!: FormGroup;
  public formLoading = false;
  public formSubmitted = false;

  public controlTitle = new FormControl('', Validators.required);
  public controlShop = new FormControl('', Validators.required);
  public controlContent = new FormControl('');
  public controlVisible = new FormControl(true);
  public controlIndex = new FormControl(false);


  public categories: PageCategory[] | undefined;
  public pageTitle = 'Create new page'
  public page: Page = new Page();
  public categoryIds: string[] = [];
  public shops: Shop[] | undefined;

  constructor(
    private pageService: PageService,
    private pageCategoryService: PageCategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private shopService: ShopService,
    private snackBar: MatSnackBar
  ) {
    this.form = new FormGroup([
      this.controlTitle,
      this.controlShop,
      this.controlContent,
      this.controlVisible,
      this.controlIndex
    ]);
  }

  ngOnInit() {
    this.queryStringPageId = this.route.snapshot.paramMap.get('pageId');
    this.queryStringShopId = this.route.snapshot.paramMap.get('shopId');

    this.shopService.getList().subscribe(shops => {
      this.shops = shops;

      if (this.queryStringShopId) {
        var selectedShop = this.shops?.find(x => x.Id == this.queryStringShopId);
        if (selectedShop) {
          this.controlShop.setValue(selectedShop.Id);
          this.pageTitle = `Create new page for shop '${selectedShop.Name}'`
        }
      }
    });

    this.pageCategoryService.getList().subscribe(categories => {

      // Fetch pages info after categories were fetched
      if (this.queryStringPageId && this.queryStringPageId != 'new') {
        this.pageService.getById(this.queryStringPageId).subscribe(x => {
          this.onRetrievePageData(x);

          this.categories = categories;
        });
      } else {
        this.categories = categories;
      }
    });
  }

  ngOnDestroy() {
    this.snackBarRef?.dismiss();
  }

  onRetrievePageData(response: GetPageResponse) {
    this.page = response.Page;
    this.pageTitle = response.Page.Title;
    this.controlTitle.setValue(response.Page.Title);
    this.controlShop.setValue(response.Page.Shop.Id);
    this.controlVisible.setValue(response.Page.Visible);
    this.controlIndex.setValue(response.Page.Index);

    if (response.Page.Content)
      this.controlContent.setValue(response.Page.Content);

    if (response.CategoryIds)
      this.categoryIds = response.CategoryIds;
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.formLoading = true;

    const pageToUpdate: Page = Object.assign({}, this.page);
    pageToUpdate.Title = this.controlTitle.value!;
    pageToUpdate.Visible = this.controlVisible.value!;
    pageToUpdate.Index = this.controlIndex.value!;

    var selectedShop = this.shops?.find(x => x.Id == this.controlShop.value);
    if (selectedShop)
      pageToUpdate.Shop = selectedShop;

    if (this.controlContent.value)
      pageToUpdate.Content = this.controlContent.value;

    let checkedCategories: string = '';

    if (this.categories) {
      this.categories.forEach(category => {
        checkedCategories = checkedCategories + this.getCategoryChecked(category);
      });
    }

    const request: MutatePageRequest = {
      Page: pageToUpdate,
      CheckedCategories: checkedCategories
    };

    if (this.queryStringPageId && this.queryStringPageId != 'new') {
      this.pageService.update(request,).subscribe({
        next: result => this.handleOnSubmitResult(result),
        error: error => this.handleOnSubmitError(error),
        complete: () => this.formLoading = false
      });
    } else {
      this.pageService.create(request).subscribe({
        next: result => this.handleOnSubmitResult(result),
        error: error => this.handleOnSubmitError(error),
        complete: () => this.formLoading = false
      });
    }
  }

  checkCategory(category: PageCategory, event: MatCheckboxChange) {
    if (event.checked) {
      if (!this.categoryIds.includes(category.Id))
        this.categoryIds.push(category.Id);
    } else {
      if (this.categoryIds.includes(category.Id))
        this.categoryIds.splice(this.categoryIds.indexOf(category.Id), 1);
    }
  }

  getCategoryChecked(category: PageCategory): string {
    let result: string = '';

    if (this.categoryIds.includes(category.Id)) {
      result = ',' + category.Id;
    }

    return result;
  }

  handleOnSubmitResult(result: MutationResult) {
    if (result.Success) {
      this.router.navigate(['/control-panel/configuration/pages']);
    } else {
      this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
      this.formLoading = false;
    }
  }

  handleOnSubmitError(error: string) {
    this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
    this.formLoading = false;
  }
}