import { TestBed, inject } from '@angular/core/testing';

import { DisplayResourceService } from './display-resource.service';

describe('DisplayResourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisplayResourceService]
    });
  });

  it('should ...', inject([DisplayResourceService], (service: DisplayResourceService) => {
    expect(service).toBeTruthy();
  }));
});
