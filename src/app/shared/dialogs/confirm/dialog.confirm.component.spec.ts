import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmComponent } from './dialog.confirm.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('DialogConfirmComponent', () => {
  let component: DialogConfirmComponent;
  let fixture: ComponentFixture<DialogConfirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogConfirmComponent],
      imports: [MatDialogModule]
    });
    fixture = TestBed.createComponent(DialogConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with a custom dialogMessage', () => {
    component.dialogMessage = 'Custom message';
    expect(component).toBeTruthy();
  });
});
