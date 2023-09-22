import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Environment } from 'src/app/shared/environments/Environment';
import { PublicShop } from 'src/app/shared/models/viewmodels/PublicShop.model';
import { ShopService } from 'src/app/shared/services/Shop.service';

@Component({
  selector: 'public-website-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})

export class PublicWebsiteShopListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  environment = Environment;
  dataSource = new MatTableDataSource<PublicShop>;
  displayedColumns: string[] = ['Featured', 'Name', 'SubDomain', 'Merchant'];
  sortDirection: string | null = 'asc';

  public form!: FormGroup;
  public controlFilterName = new FormControl('');
  public controlFilterSubDomain = new FormControl('');

  constructor(
    private shopService: ShopService
  ) {
    this.form = new FormGroup([
      this.controlFilterName,
      this.controlFilterSubDomain
    ]);
  }

  ngOnInit() {
    this.shopService.getPublicList().subscribe(shops => {
      this.dataSource = new MatTableDataSource(shops);
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
}