import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAvailabilityListComponent } from './user-availability-list.component';

describe('UserAvailabilityListComponent', () => {
  let component: UserAvailabilityListComponent;
  let fixture: ComponentFixture<UserAvailabilityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAvailabilityListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAvailabilityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
