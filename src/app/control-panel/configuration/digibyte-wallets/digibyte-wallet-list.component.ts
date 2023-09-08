import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogDeleteComponent } from 'src/app/shared/dialogs/delete/dialog.delete.component';
import { Environment } from 'src/app/shared/environments/Environment';
import { DigiByteWallet } from 'src/app/shared/models/DigiByteWallet.model';
import { DigiByteWalletService } from 'src/app/shared/services/DigiByteWallet.service';

@Component({
  selector: 'control-panel-configuration-digibyte-wallet-list',
  templateUrl: './digibyte-wallet-list.component.html'
})

export class ControlPanelConfigurationDigiByteWalletListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  environment = Environment;
  dataSource = new MatTableDataSource<DigiByteWallet>;
  displayedColumns: string[] = ['Name', 'Address', 'ActionButtons'];
  sortDirection: string | null = 'asc';

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private digibyteWalletService: DigiByteWalletService
  ) { }

  ngOnInit(): void {
    this.digibyteWalletService.getList().subscribe(digibyteWallets => {
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
    instance.dialogMessage = `Are you sure you want to delete shop '${element.Name}'?`;

    dialogDelete.afterClosed().subscribe(result => {
      if (result) {
        this.digibyteWalletService.delete(element.Id);
        dialogDelete.close();
      }
    });
  }
}