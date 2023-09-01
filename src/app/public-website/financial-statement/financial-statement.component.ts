import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Environment } from 'src/app/shared/environments/Environment';
import { Currency } from 'src/app/shared/models/Currency.model';
import { FinancialStatementTransaction } from 'src/app/shared/models/FinancialStatementTransaction.model';
import { CurrencyService } from 'src/app/shared/services/Currency.service';
import { FinancialStatementTransactionService } from 'src/app/shared/services/FinancialStatementTransaction.service';

@Component({
  selector: 'public-website-financial-statement',
  templateUrl: './financial-statement.component.html'
})

export class PublicWebsiteFinancialStatementComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  environment = Environment;
  dataSource = new MatTableDataSource<FinancialStatementTransaction>;
  displayedColumns: string[] = ['Date', 'Type', 'Amount', 'Currency', 'Description', 'Recurrance'];
  sortDirection: string | null = 'asc';

  public form!: FormGroup;
  public controlFilterDescription = new FormControl('');
  public controlFilterCurrency = new FormControl('');
  public currencies: Currency[] | undefined;

  constructor(
    private financialStatementTransactionService: FinancialStatementTransactionService,
    private currencyService: CurrencyService
  ) {
    this.form = new FormGroup([
      this.controlFilterDescription,
      this.controlFilterCurrency
    ]);
  }

  ngOnInit(): void {
    this.financialStatementTransactionService.getList().subscribe(financialStatementTransactions => {
      this.dataSource = new MatTableDataSource(financialStatementTransactions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.currencyService.getList().subscribe(currencies => this.currencies = currencies);
  }

  onSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.sortDirection = sortState.direction.toString();
    } else {
      this.sortDirection = null;
    }
  }
}
