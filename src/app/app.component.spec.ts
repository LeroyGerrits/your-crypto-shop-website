import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let matDialogRefSpy: any;
  let matDialogSpy: jasmine.SpyObj<MatDialog>

  beforeEach(() => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogRefSpy.componentInstance = { title: '', message: '' };
    matDialogRefSpy.afterClosed = () => of(true);

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogSpy.open.and.returnValue(matDialogRefSpy);

    TestBed.configureTestingModule({
    declarations: [AppComponent],
    imports: [MatDialogModule, MatIconModule, MatMenuModule, MatToolbarModule, RouterTestingModule],
    providers: [
        { provide: MatDialog, useValue: matDialogSpy },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should show a login dialog', () => {
    component.login();
    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(matDialogRefSpy.close).toHaveBeenCalled();
  });

  it('should show a logout dialog', () => {
    component.logout();
    expect(matDialogSpy.open).toHaveBeenCalled();
  });

  it('should show a sign up dialog', () => {
    component.signUp();
    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(matDialogRefSpy.close).toHaveBeenCalled();
  });
});