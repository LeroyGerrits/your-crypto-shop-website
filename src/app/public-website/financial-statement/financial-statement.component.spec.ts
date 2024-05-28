import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyService } from 'src/app/shared/services/-currency.service';
import { DatePipe } from '@angular/common';
import { FinancialStatementTransactionService } from 'src/app/shared/services/financial-statement-transaction.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { PublicWebsiteFinancialStatementComponent } from './financial-statement.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Sort } from '@angular/material/sort';
import { TestDataCurrencies } from 'src/assets/test-data/Currencies';
import { TestDataFinancialStatementTransactions } from 'src/assets/test-data/FinancialStatementTransactions';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PublicWebsiteFinancialStatementComponent', () => {
  let component: PublicWebsiteFinancialStatementComponent;
  let fixture: ComponentFixture<PublicWebsiteFinancialStatementComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  let financialStatementTransactionServiceSpy: jasmine.SpyObj<FinancialStatementTransactionService>;
  let currencyServiceSpy: jasmine.SpyObj<CurrencyService>;

  beforeEach(() => {
    financialStatementTransactionServiceSpy = jasmine.createSpyObj('FinancialStatementTransactionService', ['getList']);
    financialStatementTransactionServiceSpy.getList.and.returnValue(of(TestDataFinancialStatementTransactions));

    currencyServiceSpy = jasmine.createSpyObj('CurrencyService', ['getList']);
    currencyServiceSpy.getList.and.returnValue(of(TestDataCurrencies));

    TestBed.configureTestingModule({
    declarations: [PublicWebsiteFinancialStatementComponent],
    imports: [BrowserAnimationsModule, MatDatepickerModule, MatExpansionModule, MatIconModule, MatInputModule, MatNativeDateModule, MatPaginatorModule, MatSelectModule, MatTableModule, QRCodeModule, ReactiveFormsModule, RouterTestingModule],
    providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: CurrencyService, useValue: currencyServiceSpy },
        { provide: FinancialStatementTransactionService, useValue: financialStatementTransactionServiceSpy },
        PublicWebsiteFinancialStatementComponent,
        DatePipe,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    fixture = TestBed.createComponent(PublicWebsiteFinancialStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should filter financial statement transactions when date from filter gets used', fakeAsync(() => {
    const componentStub: PublicWebsiteFinancialStatementComponent = TestBed.inject(PublicWebsiteFinancialStatementComponent);
    spyOn(componentStub, 'filterFinancialStatementTransactions');
    componentStub.controlFilterDateFrom.setValue('x');
    tick(1000);
    expect(componentStub.filterFinancialStatementTransactions).toHaveBeenCalled();
  }));

  it('should filter financial statement transactions when date until filter gets used', fakeAsync(() => {
    const componentStub: PublicWebsiteFinancialStatementComponent = TestBed.inject(PublicWebsiteFinancialStatementComponent);
    spyOn(componentStub, 'filterFinancialStatementTransactions');
    componentStub.controlFilterDateUntil.setValue('x');
    tick(1000);
    expect(componentStub.filterFinancialStatementTransactions).toHaveBeenCalled();
  }));

  it('should filter financial statement transactions when description filter gets used', fakeAsync(() => {
    const componentStub: PublicWebsiteFinancialStatementComponent = TestBed.inject(PublicWebsiteFinancialStatementComponent);
    spyOn(componentStub, 'filterFinancialStatementTransactions');
    componentStub.controlFilterDescription.setValue('x');
    tick(1000);
    expect(componentStub.filterFinancialStatementTransactions).toHaveBeenCalled();
  }));

  it('should filter financial statement transactions when recurrance filter gets used', fakeAsync(() => {
    const componentStub: PublicWebsiteFinancialStatementComponent = TestBed.inject(PublicWebsiteFinancialStatementComponent);
    spyOn(componentStub, 'filterFinancialStatementTransactions');
    componentStub.controlFilterRecurrance.setValue('x');
    tick(1000);
    expect(componentStub.filterFinancialStatementTransactions).toHaveBeenCalled();
  }));

  it('should filter financial statement transactions when type filter gets used', fakeAsync(() => {
    const componentStub: PublicWebsiteFinancialStatementComponent = TestBed.inject(PublicWebsiteFinancialStatementComponent);
    spyOn(componentStub, 'filterFinancialStatementTransactions');
    componentStub.controlFilterType.setValue('x');
    tick(1000);
    expect(componentStub.filterFinancialStatementTransactions).toHaveBeenCalled();
  }));

  it('should filter financial statement transactions when currency filter gets used', fakeAsync(() => {
    const componentStub: PublicWebsiteFinancialStatementComponent = TestBed.inject(PublicWebsiteFinancialStatementComponent);
    spyOn(componentStub, 'filterFinancialStatementTransactions');
    componentStub.controlFilterCurrency.setValue('x');
    tick(1000);
    expect(componentStub.filterFinancialStatementTransactions).toHaveBeenCalled();
  }));

  it('should edit the sortState when a sort direction is supplied', () => {
    const routerstub: Router = TestBed.inject(Router);
    spyOn(routerstub, 'navigate');

    const fakeSortEvent: Sort = { active: 'fakeActive', direction: 'asc' };
    component.onSortChange(fakeSortEvent);
    expect(component.sortDirection).toBe('asc');
  });

  it('should clear the sortState when no sort direction is supplied', () => {
    const fakeSortEvent: Sort = { active: 'fakeActive', direction: '' };
    component.onSortChange(fakeSortEvent);
    expect(component.sortDirection).toBeNull();
  });

  it('should filter using supplied control values', () => {
    component.controlFilterDateFrom.setValue(new Date().toString());
    component.controlFilterDateUntil.setValue(new Date().toString());
    component.controlFilterDescription.setValue('Test description');
    component.controlFilterRecurrance.setValue('0');
    component.controlFilterType.setValue('0');
    component.controlFilterCurrency.setValue(TestDataCurrencies[0].Id);

    component.filterFinancialStatementTransactions();
    fixture.detectChanges();

    expect(component.dataSource).toBeDefined();
  });
});