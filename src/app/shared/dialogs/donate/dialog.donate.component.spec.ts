import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDonateComponent } from './dialog.donate.component';
import { MatDialogModule } from '@angular/material/dialog';
import { QRCodeComponent } from 'angularx-qrcode';

describe('DialogDonateComponent', () => {
  let component: DialogDonateComponent;
  let fixture: ComponentFixture<DialogDonateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDonateComponent],
      imports: [MatDialogModule, QRCodeComponent]
    });
    fixture = TestBed.createComponent(DialogDonateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});