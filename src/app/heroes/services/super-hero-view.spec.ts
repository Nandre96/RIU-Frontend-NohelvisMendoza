import { TestBed } from '@angular/core/testing';
import { SuperHeroViewService } from './super-hero-view';

describe('SuperHeroViewService', () => {
  let service: SuperHeroViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperHeroViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
