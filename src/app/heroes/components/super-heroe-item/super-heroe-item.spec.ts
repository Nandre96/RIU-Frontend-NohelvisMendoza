import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperHeroeItem } from './super-heroe-item';

describe('SuperHeroeItem', () => {
  let component: SuperHeroeItem;
  let fixture: ComponentFixture<SuperHeroeItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperHeroeItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperHeroeItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
