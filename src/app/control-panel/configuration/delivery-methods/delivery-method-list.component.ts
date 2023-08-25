import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Environment } from 'src/app/shared/environments/Environment';
import { DeliveryMethod } from 'src/app/shared/models/DeliveryMethod.model';
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

  environment = Environment;
  dataSource = new MatTableDataSource<DeliveryMethod>;
  displayedColumns: string[] = ['Name', 'Shop', 'ActionButtons'];

  public form!: FormGroup;
  public controlFilterName = new FormControl('');
  public controlFilterShop = new FormControl('');
  public shops: Shop[] | undefined;

  constructor(
    private router: Router,
    private deliveryMethodService: DeliveryMethodService,
    private shopService: ShopService
  ) { 
    this.form = new FormGroup([
      this.controlFilterName,
      this.controlFilterShop
    ]);
  }

  ngOnInit(): void {
    this.deliveryMethodService.getList().subscribe(deliveryMethods => {
      this.dataSource = new MatTableDataSource(deliveryMethods);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.shopService.getList().subscribe(shops => this.shops = shops);
  }

  onSortChange(sortState: Sort) {
    if (sortState.direction) {
      console.log(`Sorted ${sortState.direction}`);
    } else {
      console.log('Sorting cleared');
    }
  }

  editElement(element: DeliveryMethod) {
    this.router.navigate([`/control-panel/configuration/delivery-methods/${element.Id}`]);
  }

  deleteElement(element: DeliveryMethod) {
    if (confirm('Are you sure you want to delete this record?')) {
      console.log(element);
      alert('boom!');
    }
  }
}