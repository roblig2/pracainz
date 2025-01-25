import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatesFromToComponent } from './dates-from-to.component';

describe('DatesFromToComponent', () => {
  let component: DatesFromToComponent;
  let fixture: ComponentFixture<DatesFromToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatesFromToComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatesFromToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
