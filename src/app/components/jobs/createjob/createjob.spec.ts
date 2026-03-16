import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Createjob } from './createjob';

describe('Createjob', () => {
  let component: Createjob;
  let fixture: ComponentFixture<Createjob>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Createjob]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Createjob);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
