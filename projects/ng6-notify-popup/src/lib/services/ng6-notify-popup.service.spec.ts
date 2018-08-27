import { TestBed, inject } from '@angular/core/testing';

import { Ng6NotifyPopupService } from './ng6-notify-popup.service';

describe('Ng6NotifyPopupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Ng6NotifyPopupService]
    });
  });

  it('should be created', inject([Ng6NotifyPopupService], (service: Ng6NotifyPopupService) => {
    expect(service).toBeTruthy();
  }));
});
