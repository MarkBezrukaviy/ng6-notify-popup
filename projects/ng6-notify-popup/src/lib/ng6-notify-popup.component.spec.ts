import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng6NotifyPopupComponent } from './ng6-notify-popup.component';

describe('Ng6NotifyPopupComponent', () => {
  let component: Ng6NotifyPopupComponent;
  let fixture: ComponentFixture<Ng6NotifyPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng6NotifyPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng6NotifyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
