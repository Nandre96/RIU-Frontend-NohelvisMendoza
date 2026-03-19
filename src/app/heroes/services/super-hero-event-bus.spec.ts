import { TestBed } from '@angular/core/testing';

import { SuperHeroEventBus } from './super-hero-event-bus';

describe('SuperHeroEventBus', () => {
  let service: SuperHeroEventBus;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperHeroEventBus);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
