import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdayFormComponent } from './workday-form.component';

describe('WorkdayFormComponent', () => {
  let component: WorkdayFormComponent;
  let fixture: ComponentFixture<WorkdayFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkdayFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkdayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
