import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteComponent } from './autocomplete.component';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  fit('should return full name with car emoji if user is a driver', () => {
    const user = { firstName: 'John', lastName: 'Doe', isDriver: true,id:"1", userCredentials: {roles:[{name:"role"}],username:"name"}, definedRoles: [{name:"role"}], dateOfBirth:new Date(), availableDates:[{date:new Date(),remark:"aa"}], phoneNumber:"123"};
    const result = component.displayUserName(user);
    expect(result).toBe('John Doe \u{1F697}');
  });

  fit('should return full name without car emoji if user is not a driver', () => {
    const user = { firstName: 'Jane', lastName: 'Smith', isDriver: false ,id:"1", userCredentials: {roles:[{name:"role"}],username:"name"}, definedRoles: [{name:"role"}], dateOfBirth:new Date(), availableDates:[{date:new Date(),remark:"aa"}], phoneNumber:"123"};
    const result = component.displayUserName(user);
    expect(result).toBe('Jane Smith ');
  });

});
