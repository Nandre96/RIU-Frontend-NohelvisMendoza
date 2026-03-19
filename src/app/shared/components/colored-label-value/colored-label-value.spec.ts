import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoredLabelValue } from './colored-label-value';

describe('ColoredLabelValue', () => {
  let component: ColoredLabelValue;
  let fixture: ComponentFixture<ColoredLabelValue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColoredLabelValue]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColoredLabelValue);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
