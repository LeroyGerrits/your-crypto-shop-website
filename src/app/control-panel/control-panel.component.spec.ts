import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLink, RouterOutlet } from '@angular/router';

import { ControlPanelComponent } from './control-panel.component';

describe('ControlPanelComponent', () => {
  let component: ControlPanelComponent;
  let fixture: ComponentFixture<ControlPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlPanelComponent],
      imports: [RouterLink, RouterOutlet]
    });
    fixture = TestBed.createComponent(ControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
