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
import { Field } from 'src/app/shared/models/Field.model';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Shop } from 'src/app/shared/models/Shop.model';
import { GetFieldsParameters } from 'src/app/shared/models/parameters/GetFieldsParameters.model';
import { FieldService } from 'src/app/shared/services/Field.service';
import { ShopService } from 'src/app/shared/services/Shop.service';

@Component({
  selector: 'control-panel-configuration-field-list',
  templateUrl: './field-list.component.html',
  styleUrl: './field-list.component.scss'
})

export class ControlPanelConfigurationFieldListComponent implements OnDestroy, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

  environment = Environment;
  constants = Constants;
  dataSource = new MatTableDataSource<Field>;
  displayedColumns: string[] = ['Name', 'Shop', 'Costs', 'ActionButtons'];
  sortDirection: string | null = 'asc';
  finishedLoading: boolean = false;

  public form!: FormGroup;
  public controlFilterName = new FormControl('');
  public controlFilterShop = new FormControl('');

  public shops: Shop[] | undefined;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private fieldService: FieldService,
    private shopService: ShopService
  ) {
    this.form = new FormGroup([
      this.controlFilterName,
      this.controlFilterShop
    ]);

    this.controlFilterName.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterFields());
    this.controlFilterShop.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterFields());
  }

  ngOnInit() {
    this.shopService.getList().subscribe(shops => this.shops = shops);
    this.filterFields();
  }

  ngOnDestroy(): void {
    this.snackBarRef?.dismiss();
  }

  filterFields() {
    const parameters: GetFieldsParameters = {
      Name: this.controlFilterName.value!,
      ShopId: this.controlFilterShop.value!
    };

    this.fieldService.getList(parameters).subscribe(fields => {
      this.dataSource = new MatTableDataSource(fields);
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

  editElement(element: Field) {
    this.router.navigate([`/control-panel/configuration/fields/${element.Id}`]);
  }

  deleteElement(element: Field) {
    const dialogDelete = this.dialog.open(DialogDeleteComponent);
    const instance = dialogDelete.componentInstance;
    instance.dialogMessage = `Are you sure you want to delete field '${element.Name}'?`;

    dialogDelete.afterClosed().subscribe(result => {
      if (result) {
        this.fieldService.delete(element.Id).subscribe({
          next: result => this.handleOnSubmitResult(result),
          error: error => this.handleOnSubmitError(error),
          complete: () => dialogDelete.close()
        });
      }
    });
  }

  handleOnSubmitResult(result: MutationResult) {
    if (result.Success) {
      this.filterFields();
    } else {
      this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
    }
  }

  handleOnSubmitError(error: string) {
    this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
  }
}