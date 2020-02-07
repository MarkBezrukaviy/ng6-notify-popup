import { TestBed, inject } from '@angular/core/testing';

import { ComponentInjectService } from './component-inject.service';

describe('ComponentInjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentInjectService]
    });
  });

  it('should be created', inject([ComponentInjectService], (service: ComponentInjectService) => {
    expect(service).toBeTruthy();
  }));
});
