import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {EventService} from '../services/event.service';
import {User} from '../models/user';
import {Event} from '../models/event';
import {CommonModule} from "@angular/common";
import {Observable, tap} from "rxjs";
import {Pageable} from "../models/Pageable";
import {MatDatepicker, MatDatepickerInputEvent} from "@angular/material/datepicker";
import {MaterialModule} from "../shared/material.module";
import {SingleDateComponent} from "../shared/single-date/single-date.component";
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MultiSelectComponent} from "../shared/multi-select/multi-select.component";
import {UserFormComponent} from "../components/user-form/user-form.component";
import {HeaderComponent} from "../header/header.component"
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {ActivatedRoute, Router} from "@angular/router";
import {AutocompleteComponent} from "../shared/autocomplete/autocomplete.component";
import {parseDate} from "../shared/autocomplete/DateUtils";

@Component({
  selector: 'app-admin',
  standalone: true,
	imports: [
		ReactiveFormsModule,
		CommonModule,
		MaterialModule,
		MatDatepicker,
		SingleDateComponent,
		MatSnackBarModule,
		MultiSelectComponent,
		UserFormComponent,
		HeaderComponent,
		NgxMaterialTimepickerModule,
		AutocompleteComponent

	],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,


})
export class EventFormComponent implements OnInit {
  header = 'Utwórz wydarzenie';
  isEdit = false;
  // users: User[] = [];
  pageable$= new Observable<Pageable<Event>>();

  eventForm: FormGroup;
  usersForEvent = signal<User[]>([]);
  usersForPacking = signal<User[]>([]);
  bookedUsers=signal<User[]>([]);
  bookedPackingUsers=signal<User[]>([]);

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private route:Router,
    private eventService: EventService,
    private cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar
  ) {
    this.eventForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      location: ['', Validators.required],
      eventTime: ['', Validators.required],
      requiredUsers: ['', Validators.required],
      packingTime: ['',Validators.required],
      requiredDrivers: ['', Validators.required],
      availableUsers:[''],
      availablePackingUsers:[''],
      editDate: !this.isEdit,
      editDatePacking: !this.isEdit
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadEvent(id);
      }
    });
  }

  loadEvent(id: string): void {
    this.eventService.getEventById(id).subscribe(event => {
      this.isEdit = true;
      this.header = `Edycja wydarzenia: ${event.name}`;

      this.eventForm.patchValue({
        id:event.id,
        name: event.name,
        location: event.location,
        date: parseDate(event.date.toString()),
        datePacking: parseDate(event.datePacking.toString()),
        eventTime: event.eventTime,
        requiredUsers: event.requiredUsers,
        packingTime: event.packingTime,
        requiredDrivers: event.requiredDrivers,
        availableUsers: event.availableUsers,
        availablePackingUsers: event.availablePackingUsers,
        editDate:false,
        editDatePacking:false
      });
      this.bookedUsers.set(event.availableUsers ? event.availableUsers : []);
      this.bookedPackingUsers.set(event.availablePackingUsers ? event.availablePackingUsers : []);
      this.loadAvailableUsers(this.eventForm.controls['date']?.value);
      if(this.eventForm.controls['datePacking']?.value && typeof this.eventForm.controls['datePacking']?.value !== 'object'){
        this.loadAvailableUsers(this.eventForm.controls['datePacking']?.value);
      }
      this.eventForm.controls['date']?.updateValueAndValidity();
    });
  }


  onSubmit() {
    if (this.eventForm.valid) {
      this.replaceEmptyFieldsWithNull();
      if (this.isEdit) {
        this.editEvent();
      } else {
        this.createEvent();
      }
    }
  }
  replaceEmptyFieldsWithNull() {
    const formValues = this.eventForm.value;

    Object.keys(formValues).forEach(key => {
      if (formValues[key] === "") {
        this.eventForm.get(key)?.setValue(null);
      }
    });
  }
  createEvent() {
    // //todo usunięcie pustych elementów formularza
    // this.eventForm.controls['id']?.patchValue(null);
    this.eventService.createEvent(this.eventForm.value).subscribe(event => {
      this.ngOnInit();
      Object.keys(this.eventForm.controls).forEach(key => {
        this.eventForm.get(key)?.setErrors(null);
      });
      this.openSnackBar('Event utworzony', 'zamknij');
    });

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 3000,
      verticalPosition: 'top'
    });
  }


  private editEvent() {
    this.eventService.editEvent(this.eventForm.value).subscribe(event => {
      this.ngOnInit();
      Object.keys(this.eventForm.controls).forEach(key => {
        this.eventForm.get(key)?.setErrors(null);
      });
      this.openSnackBar('Event zaktualizowany', 'zamknij');
      this.route.navigate(["/eventDetails/"+event.id])
    });
  }

  getAvailableUsers(event: MatDatepickerInputEvent<any, any>) {
    this.bookedUsers.set([]);
    this.userService.getUsersByDate(new Date(event.target.value)).pipe(tap(value => {
      this.usersForEvent.set(value);
    })).subscribe();
  }
  getAvailablePackingUsers(event: MatDatepickerInputEvent<any, any>) {
    this.bookedPackingUsers.set([]);
    this.userService.getUsersByDate(new Date(event.target.value)).pipe(tap(value => {
      this.usersForPacking.set(value);
    })).subscribe();
  }

  private loadAvailableUsers(date: Date) {
    if(date.getHours() == 0){
      date.setHours(2);
    }
    this.userService.getUsersByDate(new Date(date)).pipe(tap(value => {
      this.usersForEvent.set(value);
    })).subscribe();
  }
  toggleEventDateControl() {
    if (this.eventForm.get('editDate')?.value) {
      this.eventForm.get('date')?.enable();
    } else {
      this.eventForm.get('date')?.disable();
    }
  }

  togglePackingDateControl() {
    if (this.eventForm.get('editDatePacking')?.value) {
      this.eventForm.get('datePacking')?.enable();
    } else {
      this.eventForm.get('datePacking')?.disable();
    }
  }

  updateAvailableUsers(event: User[]) {
    this.eventForm.get('availableUsers')?.patchValue(event);
  }

  updateAvailablePackingUsers(event: User[]) {
    this.eventForm.get('availablePackingUsers')?.patchValue(event);
  }
}
