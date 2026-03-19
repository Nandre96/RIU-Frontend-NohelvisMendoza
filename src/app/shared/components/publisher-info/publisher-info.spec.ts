import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherInfo } from './publisher-info';

describe('PublisherInfo', () => {
  let component: PublisherInfo;
  let fixture: ComponentFixture<PublisherInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublisherInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublisherInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
