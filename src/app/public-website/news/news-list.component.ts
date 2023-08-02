import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NewsMessage } from 'src/app/shared/models/NewsMessage.model';
import { NewsMessageService } from 'src/app/shared/services/NewsMessage.service';

@Component({
  selector: 'public-website-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<NewsMessage>;
  columns: number = 3;

  constructor(
    private newsMessageService: NewsMessageService
  ) { }

  ngOnInit(): void {
    this.columns = (window.innerWidth <= 750) ? 1 : 3;

    this.newsMessageService.getList().subscribe(shops => {
      this.dataSource = new MatTableDataSource(shops);
      this.dataSource.paginator = this.paginator;
    });
  }

  handleResize() {
    this.columns = (window.innerWidth <= 750) ? 1 : 3;
  }
}