import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Constants } from 'src/app/shared/Constants';
import { Shop } from 'src/app/shared/models/Shop.model';
import { ShopService } from 'src/app/shared/services/shop.service';

@Component({
  selector: 'control-panel-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
})

export class ShopListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constants = Constants;
  dataSource = new MatTableDataSource<Shop>;
  displayedColumns: string[] = ['Name', 'SubDomain', 'buttons'];

  constructor(
    private router: Router,
    private shopService: ShopService
  ) { }

  ngOnInit(): void {
    this.shopService.getList().subscribe(shops => {
      this.dataSource = new MatTableDataSource(shops);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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