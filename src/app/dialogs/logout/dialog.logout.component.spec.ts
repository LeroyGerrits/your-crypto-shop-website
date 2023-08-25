import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLogoutComponent } from './dialog.logout.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('DialogLogoutComponent', () => {
  let component: DialogLogoutComponent;
  let fixture: ComponentFixture<DialogLogoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogLogoutComponent],
      imports: [MatDialogModule]
    });
    fixture = TestBed.createComponent(DialogLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
