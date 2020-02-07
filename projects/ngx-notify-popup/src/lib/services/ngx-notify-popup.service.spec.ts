import { TestBed, inject } from '@angular/core/testing';

import { NgxNotifyPopupService } from './ngx-notify-popup.service';

describe('NgxNotifyPopupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxNotifyPopupService]
    });
  });

  it('should be created', inject([NgxNotifyPopupService], (service: NgxNotifyPopupService) => {
    expect(service).toBeTruthy();
  }));
});
