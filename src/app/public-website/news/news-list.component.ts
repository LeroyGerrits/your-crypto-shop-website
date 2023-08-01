import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NewsMessage } from 'src/app/shared/models/NewsMessage.model';
import { NewsMessageService } from 'src/app/shared/services/NewsMessage.service';

@Component({
  selector: 'public-website-news-list',
  templateUrl: './news-list.component.html'
})
export class NewsListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<NewsMessage>;

  constructor(
    private newsMessageService: NewsMessageService
  ) { }

  ngOnInit(): void {
    this.newsMessageService.getList().subscribe(shops => {
      this.dataSource = new MatTableDataSource(shops);
      this.dataSource.paginator = this.paginator;
    });
  }
}