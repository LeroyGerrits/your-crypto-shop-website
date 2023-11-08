import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogDeleteComponent } from 'src/app/shared/dialogs/delete/dialog.delete.component';
import { Environment } from 'src/app/shared/environments/Environment';
import { DeliveryMethod } from 'src/app/shared/models/DeliveryMethod.model';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Shop } from 'src/app/shared/models/Shop.model';
import { DeliveryMethodService } from 'src/app/shared/services/DeliveryMethod.service';
import { ShopService } from 'src/app/shared/services/Shop.service';

@Component({
  selector: 'control-panel-configuration-delivery-method-list',
  templateUrl: './delivery-method-list.component.html'
})

export class ControlPanelConfigurationDeliveryMethodListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

  environment = Environment;
  dataSource = new MatTableDataSource<DeliveryMethod>;
  displayedColumns: string[] = ['Name', 'Shop', 'ActionButtons'];
  sortDirection: string | null = 'asc';

  public form!: FormGroup;
  public controlFilterName = new FormControl('');
  public controlFilterShop = new FormControl('');
  public shops: Shop[] | undefined;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private deliveryMethodService: DeliveryMethodService,
    private shopService: ShopService
  ) {
    this.form = new FormGroup([
      this.controlFilterName,
      this.controlFilterShop
    ]);
  }

  ngOnInit() {
    this.deliveryMethodService.getList().subscribe(deliveryMethods => {
      this.dataSource = new MatTableDataSource(deliveryMethods);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.shopService.getList().subscribe(shops => this.shops = shops);
  }

  ngOnDestroy(): void {
    this.snackBarRef?.dismiss();
  }

  onSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.sortDirection = sortState.direction.toString();
    } else {
      this.sortDirection = null;
    }
  }

  editElement(element: DeliveryMethod) {
    this.router.navigate([`/control-panel/configuration/delivery-methods/${element.Id}`]);
  }

  deleteElement(element: DeliveryMethod) {
    const dialogDelete = this.dialog.open(DialogDeleteComponent);
    const instance = dialogDelete.componentInstance;
    instance.dialogMessage = `Are you sure you want to delete delivery method '${element.Name}'?`;

    dialogDelete.afterClosed().subscribe(result => {
      if (result) {
        this.deliveryMethodService.delete(element.Id).subscribe({
          next: result => this.handleOnSubmitResult(result),
          error: error => this.handleOnSubmitError(error),
          complete: () => dialogDelete.close()
        });
      }
    });
  }

  handleOnSubmitResult(result: MutationResult) {
    if (result.Success) {
      this.router.navigate(['/control-panel/configuration/delivery-methods']);
    } else {
      this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
    }
  }

  handleOnSubmitError(error: string) {
    this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
  }
}