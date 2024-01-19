import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Constants } from 'src/app/shared/Constants';
import { DialogDeleteComponent } from 'src/app/shared/dialogs/delete/dialog.delete.component';
import { Environment } from 'src/app/shared/environments/Environment';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Page } from 'src/app/shared/models/Page.model';
import { Shop } from 'src/app/shared/models/Shop.model';
import { GetPagesParameters } from 'src/app/shared/models/parameters/GetPagesParameters.model';
import { BooleanConvertPipe } from 'src/app/shared/pipes/BooleanConvert.pipe';
import { PageService } from 'src/app/shared/services/Page.service';
import { ShopService } from 'src/app/shared/services/Shop.service';

@Component({
  selector: 'control-panel-configuration-page-list',
  templateUrl: './page-list.component.html',
  styleUrl: './page-list.component.scss'
})

export class ControlPanelConfigurationPageListComponent implements OnDestroy, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

  environment = Environment;
  constants = Constants;
  dataSource = new MatTableDataSource<Page>;
  displayedColumns: string[] = ['Title', 'Shop', 'ActionButtons'];
  sortDirection: string | null = 'asc';
  finishedLoading: boolean = false;

  public form!: FormGroup;
  public controlFilterTitle = new FormControl('');
  public controlFilterShop = new FormControl('');
  public controlFilterVisible = new FormControl('');

  public shops: Shop[] | undefined;

  constructor(
    private booleanConvertPipe: BooleanConvertPipe,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private pageService: PageService,
    private shopService: ShopService
  ) {
    this.form = new FormGroup([
      this.controlFilterTitle,
      this.controlFilterShop,
      this.controlFilterVisible
    ]);

    this.controlFilterTitle.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterPages());
    this.controlFilterShop.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterPages());
    this.controlFilterVisible.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterPages());
  }

  ngOnInit() {
    this.shopService.getList().subscribe(shops => this.shops = shops);
    this.filterPages();
  }

  ngOnDestroy(): void {
    this.snackBarRef?.dismiss();
  }

  filterPages() {
    const parameters: GetPagesParameters = {
      Title: this.controlFilterTitle.value!,
      ShopId: this.controlFilterShop.value!,
      Visible: this.booleanConvertPipe.transform(this.controlFilterVisible.value)
    };

    this.pageService.getList(parameters).subscribe(pages => {
      this.dataSource = new MatTableDataSource(pages);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.finishedLoading = true;
    });
  }

  onSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.sortDirection = sortState.direction.toString();
    } else {
      this.sortDirection = null;
    }
  }

  editElement(element: Page) {
    this.router.navigate([`/control-panel/configuration/pages/${element.Id}`]);
  }

  deleteElement(element: Page) {
    const dialogDelete = this.dialog.open(DialogDeleteComponent);
    const instance = dialogDelete.componentInstance;
    instance.dialogMessage = `Are you sure you want to delete page '${element.Title}'?`;

    dialogDelete.afterClosed().subscribe(result => {
      if (result) {
        this.pageService.delete(element.Id).subscribe({
          next: result => this.handleOnSubmitResult(result),
          error: error => this.handleOnSubmitError(error),
          complete: () => dialogDelete.close()
        });
      }
    });
  }

  handleOnSubmitResult(result: MutationResult) {
    if (result.Success) {
      this.filterPages();
    } else {
      this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
    }
  }

  handleOnSubmitError(error: string) {
    this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
  }
}