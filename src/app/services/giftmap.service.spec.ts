import { TestBed } from '@angular/core/testing';

import { GiftMapService } from './giftmap.service';

describe('GiftMapService', () => {
  let service: GiftMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiftMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
