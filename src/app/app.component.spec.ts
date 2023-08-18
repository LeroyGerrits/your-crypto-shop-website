import { HttpClient, HttpHandler } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [MatDialogModule, MatMenuModule, MatToolbarModule, RouterTestingModule],
    declarations: [AppComponent],
    providers: [HttpClient, HttpHandler]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});