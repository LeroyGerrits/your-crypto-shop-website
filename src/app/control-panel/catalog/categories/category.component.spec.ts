import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { AccountComponent } from 'src/app/account/account.component';
import { AuthenticationService } from 'src/app/shared/services/Authentication.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlPanelCatalogCategoryComponent } from './category.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/Category.service';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { MatCheckboxModule } from '@angular/material/checkbox';

describe('ControlPanelCatalogCategoryComponent', () => {
  let component: ControlPanelCatalogCategoryComponent;
  let fixture: ComponentFixture<ControlPanelCatalogCategoryComponent>;

  let matDialogRefSpy: any;
  let matDialogSpy: jasmine.SpyObj<MatDialog>
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let mutationResult: MutationResult = { ErrorCode: 0, Identity: '', Message: '' };

  beforeEach(() => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogRefSpy.componentInstance = { title: '', message: '' };
    matDialogRefSpy.afterClosed = () => of(true);
    matDialogRefSpy.close = () => of(true);

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogSpy.open.and.returnValue(matDialogRefSpy);

    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['create', 'update']);
    categoryServiceSpy.create.and.returnValue(of(mutationResult));
    categoryServiceSpy.update.and.returnValue(of(mutationResult));    

    TestBed.configureTestingModule({
      declarations: [ControlPanelCatalogCategoryComponent],
      imports: [BrowserAnimationsModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterTestingModule.withRoutes(
        [{ path: 'account', component: AccountComponent }]
      )],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: CategoryService, useVaue: categoryServiceSpy },
        HttpClient,
        HttpHandler
      ]
    });
    fixture = TestBed.createComponent(ControlPanelCatalogCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
