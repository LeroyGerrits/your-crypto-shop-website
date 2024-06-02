import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Constants } from 'src/app/shared/-constants';
import { DialogDeleteComponent } from 'src/app/shared/dialogs/delete/dialog.delete.component';
import { Environment } from 'src/app/shared/environments/Environment';
import { CryptoWallet } from 'src/app/shared/models/crypto-wallet.model';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { GetCryptoWalletsParameters } from 'src/app/shared/models/parameters/GetCryptoWalletsParameters.model';
import { CryptoWalletService } from 'src/app/shared/services/crypto-wallet.service';

@Component({
  selector: 'control-panel-configuration-crypto-wallet-list',
  templateUrl: './crypto-wallet-list.component.html',
  styleUrl: './crypto-wallet-list.component.scss'
})

export class ControlPanelConfigurationCryptoWalletListComponent implements OnDestroy, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

  environment = Environment;
  constants = Constants;
  dataSource = new MatTableDataSource<CryptoWallet>;
  displayedColumns: string[] = ['Name', 'Address', 'ActionButtons'];
  sortDirection: string | null = 'asc';

  public form!: FormGroup;
  public controlFilterName = new FormControl('');
  public controlFilterAddress = new FormControl('');

  constructor(
    public dialog: MatDialog,
    private cryptoWalletService: CryptoWalletService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = new FormGroup([
      this.controlFilterName,
      this.controlFilterAddress
    ]);

    this.controlFilterName.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterCryptoWallets());
    this.controlFilterAddress.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterCryptoWallets());
  }

  ngOnInit() {
    this.filterCryptoWallets();
  }

  ngOnDestroy(): void {
    this.snackBarRef?.dismiss();
  }

  filterCryptoWallets() {
    const parameters: GetCryptoWalletsParameters = {
      Name: this.controlFilterName.value!,
      Address: this.controlFilterAddress.value!
    };

    this.cryptoWalletService.getList(parameters).subscribe(cryptoWallets => {
      this.dataSource = new MatTableDataSource(cryptoWallets);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.sortDirection = sortState.direction.toString();
    } else {
      this.sortDirection = null;
    }
  }

  editElement(element: CryptoWallet) {
    this.router.navigate([`/control-panel/configuration/crypto-wallets/${element.Id}`]);
  }

  deleteElement(element: CryptoWallet) {
    const dialogDelete = this.dialog.open(DialogDeleteComponent);
    const instance = dialogDelete.componentInstance;
    instance.dialogMessage = `Are you sure you want to delete the assignment to crypto wallet '${element.Name}'?`;

    dialogDelete.afterClosed().subscribe(result => {
      if (result) {
        this.cryptoWalletService.delete(element.Id).subscribe({
          next: result => this.handleOnSubmitResult(result),
          error: error => this.handleOnSubmitError(error),
          complete: () => dialogDelete.close()
        });
      }
    });
  }

  handleOnSubmitResult(result: MutationResult) {
    if (result.Success) {
      this.filterCryptoWallets();
    } else {
      this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
    }
  }

  handleOnSubmitError(error: string) {
    this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
  }
}