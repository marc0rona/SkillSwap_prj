import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userreviews } from './userreviews';

describe('Userreviews', () => {
  let component: Userreviews;
  let fixture: ComponentFixture<Userreviews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Userreviews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Userreviews);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
