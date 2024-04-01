import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Environment } from 'src/app/shared/environments/Environment';
import { Country } from 'src/app/shared/models/Country.model';
import { ShopCategory } from 'src/app/shared/models/ShopCategory.model';
import { GetShopsParameters } from 'src/app/shared/models/parameters/GetShopsParameters.model';
import { PublicShop } from 'src/app/shared/models/viewmodels/PublicShop.model';
import { CountryService } from 'src/app/shared/services/Country.service';
import { ShopService } from 'src/app/shared/services/Shop.service';
import { ShopCategoryService } from 'src/app/shared/services/ShopCategory.service';

@Component({
  selector: 'public-website-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrl: './shop-list.component.scss'
})

export class PublicWebsiteShopListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  environment = Environment;
  dataSource = new MatTableDataSource<PublicShop>;
  displayedColumns: string[] = ['Featured', 'Name', 'Country', 'Category', 'Merchant'];
  sortDirection: string | null = 'asc';

  public form!: FormGroup;
  public controlFilterName = new FormControl('');
  public controlFilterSubDomain = new FormControl('');
  public controlFilterCountry = new FormControl('');
  public controlFilterShopCategory = new FormControl('');

  public countries: Country[] | undefined;
  public shopCategories: ShopCategory[] | undefined;

  constructor(
    private countryService: CountryService,
    private shopService: ShopService,
    private shopCategoryService: ShopCategoryService
  ) {
    this.form = new FormGroup([
      this.controlFilterName,
      this.controlFilterSubDomain,
      this.controlFilterCountry,
      this.controlFilterShopCategory
    ]);

    this.controlFilterName.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterShops());
    this.controlFilterSubDomain.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterShops());
    this.controlFilterCountry.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterShops());
    this.controlFilterShopCategory.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.filterShops());
  }

  ngOnInit() {
    this.filterShops();
    this.countryService.getList().subscribe(countries => this.countries = countries);
    this.shopCategoryService.getList().subscribe(shopCategories => this.shopCategories = shopCategories);
  }

  filterShops() {
    const parameters: GetShopsParameters = {
      Name: this.controlFilterName.value!,
      SubDomain: this.controlFilterSubDomain.value!,
      CountryId: this.controlFilterCountry.value!,
      ShopCategoryId: this.controlFilterShopCategory.value!
    };

    this.shopService.getListPublic(parameters).subscribe(shops => {
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