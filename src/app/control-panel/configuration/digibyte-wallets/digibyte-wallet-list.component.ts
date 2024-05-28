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
import { DigiByteWallet } from 'src/app/shared/models/digibyte-wallet.model';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';
import { GetDigiByteWalletsParameters } from 'src/app/shared/models/parameters/GetDigiByteWalletsParameters.model';
import { DigiByteWalletService } from 'src/app/shared/services/digibyte-wallet.service';

@Component({
  selector: 'control-panel-configuration-digibyte-wallet-list',
  templateUrl: './digibyte-wallet-list.component.html',
  styleUrl: './digibyte-wallet-list.component.scss'
})

export class ControlPanelConfigurationDigiByteWalletListComponent implements OnDestroy, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

  environment = Environment;
  constants = Constants;
  dataSource = new MatTableDataSource<DigiByteWallet>;
  displayedColumns: string[] = ['Name', 'Address', 'ActionButtons'];
  sortDirection: string | null = 'asc';

  public form!: FormGroup;
  public controlFilterName = new FormControl('');
  public controlFilterAddress = new FormControl('');

  constructor(
    public dialog: MatDialog,
    private digibyteWalletService: DigiByteWalletService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = new FormGroup([
      this.controlFilterName,
      this.controlFilterAddress
    ]);

    this.controlFilterName.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterDigiByteWallets());
    this.controlFilterAddress.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterDigiByteWallets());
  }

  ngOnInit() {
    this.filterDigiByteWallets();
  }

  ngOnDestroy(): void {
    this.snackBarRef?.dismiss();
  }

  filterDigiByteWallets() {
    const parameters: GetDigiByteWalletsParameters = {
      Name: this.controlFilterName.value!,
      Address: this.controlFilterAddress.value!
    };

    this.digibyteWalletService.getList(parameters).subscribe(digibyteWallets => {
      this.dataSource = new MatTableDataSource(digibyteWallets);
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

  editElement(element: DigiByteWallet) {
    this.router.navigate([`/control-panel/configuration/digibyte-wallets/${element.Id}`]);
  }

  deleteElement(element: DigiByteWallet) {
    const dialogDelete = this.dialog.open(DialogDeleteComponent);
    const instance = dialogDelete.componentInstance;
    instance.dialogMessage = `Are you sure you want to delete the assignment to DigiByte wallet '${element.Name}'?`;

    dialogDelete.afterClosed().subscribe(result => {
      if (result) {
        this.digibyteWalletService.delete(element.Id).subscribe({
          next: result => this.handleOnSubmitResult(result),
          error: error => this.handleOnSubmitError(error),
          complete: () => dialogDelete.close()
        });
      }
    });
  }

  handleOnSubmitResult(result: MutationResult) {
    if (result.Success) {
      this.filterDigiByteWallets();
    } else {
      this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
    }
  }

  handleOnSubmitError(error: string) {
    this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
  }
}