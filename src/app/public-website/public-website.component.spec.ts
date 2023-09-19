import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd } from '@angular/router';
import { PublicWebsiteComponent } from './public-website.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('PublicWebsiteComponent', () => {
  let component: PublicWebsiteComponent;
  let fixture: ComponentFixture<PublicWebsiteComponent>;

  let matDialogRefSpy: any;
  let matDialogSpy: jasmine.SpyObj<MatDialog>

  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(() => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogRefSpy.componentInstance = { title: '', message: '' };
    matDialogRefSpy.afterClosed = () => of(true);

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogSpy.open.and.returnValue(matDialogRefSpy);

    TestBed.configureTestingModule({
      declarations: [PublicWebsiteComponent],
      imports: [RouterLink, RouterLinkActive, RouterOutlet],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: MatDialog, useValue: matDialogSpy }
      ]
    });
    fixture = TestBed.createComponent(PublicWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show call to action when index page is active', () => {
    let indexNav = new NavigationEnd(1, '/', '/');
    TestBed.get(Router).events.next(indexNav);
    expect(component.showCallToAction).toBeTrue();
  });

  it('should show a sign up dialog', () => {
    component.signUp();
    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(matDialogRefSpy.close).toHaveBeenCalled();
  });
});