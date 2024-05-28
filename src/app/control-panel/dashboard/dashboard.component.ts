import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/shared/services/-authentication.service';
import { Chart, ChartItem } from 'chart.js/auto';
import { Constants } from 'src/app/shared/-constants';
import { Merchant } from 'src/app/shared/models/-merchant.model';
import { IDictionaryNumber } from 'src/app/shared/interfaces/idictionary-number.interface';
import { GeneralService } from 'src/app/shared/services/-general.service';

@Component({
  selector: 'control-panel-dashboard',
  templateUrl: './dashboard.component.html'
})

export class ControlPanelDashboardComponent implements OnInit {
  public activeMerchant?: Merchant | null;
  constants = Constants;

  private dataSales: IDictionaryNumber = {};
  private dataSalesRaw: any[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    const bodyStyles = window.getComputedStyle(document.body);
    Chart.defaults.borderColor = bodyStyles.getPropertyValue('--light-gray-color');
    Chart.defaults.color = bodyStyles.getPropertyValue('--font-color');

    this.authenticationService.merchant.subscribe(x => this.activeMerchant = x?.Merchant);
    this.generalService.getDashboardSales('month').subscribe(sales => {
      for (let key in sales) {
        this.dataSalesRaw.push({ period: key, sales: sales[key] });
      }

      new Chart(
        <ChartItem>document.getElementById('ChartSales'),
        {
          type: 'line',
          options: {
            animation: false,
            plugins: {
              legend: {
                display: false
              }
            }
          },
          data: {
            labels: this.dataSalesRaw.map(row => row.period),
            datasets: [
              {
                label: 'Sales per month',
                backgroundColor: bodyStyles.getPropertyValue('--light-blue-color'),
                borderColor: bodyStyles.getPropertyValue('--light-blue-color'),
                data: this.dataSalesRaw.map(row => row.sales)
              }
            ]
          }
        }
      );
    });
  }
}