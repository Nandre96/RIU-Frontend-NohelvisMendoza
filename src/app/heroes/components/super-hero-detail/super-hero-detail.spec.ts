import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperHeroDetail } from './super-hero-detail';

describe('SuperHeroDetail', () => {
  let component: SuperHeroDetail;
  let fixture: ComponentFixture<SuperHeroDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperHeroDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperHeroDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
