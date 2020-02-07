import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxNotifyPopupComponent } from './ngx-notify-popup.component';

describe('NgxNotifyPopupComponent', () => {
  let component: NgxNotifyPopupComponent;
  let fixture: ComponentFixture<NgxNotifyPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxNotifyPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxNotifyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
