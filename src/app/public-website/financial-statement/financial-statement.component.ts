import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Constants } from 'src/app/shared/Constants';
import { FinancialStatementTransactionType } from 'src/app/shared/enums/FinancialStatementTransactionType.enum';
import { Recurrance } from 'src/app/shared/enums/Recurrance.enum';
import { Currency } from 'src/app/shared/models/Currency.model';
import { FinancialStatementTransaction } from 'src/app/shared/models/FinancialStatementTransaction.model';
import { GetFinancialStatementTransactionsParameters } from 'src/app/shared/models/parameters/GetFinancialStatementTransactionsParameters.model';
import { CurrencyService } from 'src/app/shared/services/Currency.service';
import { FinancialStatementTransactionService } from 'src/app/shared/services/FinancialStatementTransaction.service';

@Component({
  selector: 'public-website-financial-statement',
  templateUrl: './financial-statement.component.html',
  styleUrls: ['./financial-statement.component.scss']
})

export class PublicWebsiteFinancialStatementComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  financialStatementTransactionTypes = Object.keys(FinancialStatementTransactionType).filter(p => isNaN(p as any));
  recurrances = Object.keys(Recurrance).filter(p => isNaN(p as any));

  constants = Constants;
  
  dataSource = new MatTableDataSource<FinancialStatementTransaction>;
  displayedColumns: string[] = ['Date', 'Description', 'Recurrance', 'Type', 'Currency', 'Amount'];
  sortDirection: string | null = 'asc';

  public form!: FormGroup;
  public controlFilterDateFrom = new FormControl('');
  public controlFilterDateUntil = new FormControl('');
  public controlFilterDescription = new FormControl('');
  public controlFilterRecurrance = new FormControl('');
  public controlFilterType = new FormControl('');
  public controlFilterCurrency = new FormControl('');
  public currencies: Currency[] | undefined;

  constructor(
    private financialStatementTransactionService: FinancialStatementTransactionService,
    private currencyService: CurrencyService
  ) {
    this.form = new FormGroup([
      this.controlFilterDateFrom,
      this.controlFilterDateUntil,
      this.controlFilterDescription,
      this.controlFilterRecurrance,
      this.controlFilterType,
      this.controlFilterCurrency
    ]);
  }

  ngOnInit() {
    this.onFilter();
    this.currencyService.getList().subscribe(currencies => this.currencies = currencies);
  }

  onFilter() {
    const parameters: GetFinancialStatementTransactionsParameters = {};
    if (this.controlFilterDateFrom.value) parameters.DateFrom = new Date(this.controlFilterDateFrom.value);
    if (this.controlFilterDateUntil.value) parameters.DateUntil = new Date(this.controlFilterDateUntil.value);
    if (this.controlFilterDescription.value) parameters.Description = this.controlFilterDescription.value;
    if (this.controlFilterRecurrance.value) parameters.Recurrance = parseInt(this.controlFilterRecurrance.value);
    if (this.controlFilterType.value) parameters.Type = parseInt(this.controlFilterType.value);
    if (this.controlFilterCurrency.value) parameters.CurrencyId = this.controlFilterCurrency.value;

    this.financialStatementTransactionService.getList(parameters).subscribe(financialStatementTransactions => {
      this.dataSource = new MatTableDataSource(financialStatementTransactions);
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
