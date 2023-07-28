import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';

import { Constants } from 'src/app/shared/Constants';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Shop } from 'src/app/shared/models/Shop.model';
import { TestDataShops } from 'src/assets/test-data/Shops';

@Component({
  selector: 'control-panel-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
})

export class ShopListComponent implements AfterViewInit {
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constants = Constants;
  dataSource = new MatTableDataSource(TestDataShops);
  displayedColumns: string[] = ['Name', 'SubDomain', 'buttons'];
  
  constructor(private router: Router) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      console.log(`Sorted ${sortState.direction}`);
    } else {
      console.log('Sorting cleared');
    }
  }

  editElement(element: Shop) {
    this.router.navigate([`/control-panel/configuration/shops/${element.Id}`]);
  }

  deleteElement(element: Shop) {
    if (confirm('Are you sure you want to delete this record?')) {
      console.log(element);
      alert('boom!');
    }
  }
}