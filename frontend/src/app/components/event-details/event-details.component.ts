import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Event} from "../../models/event"
import {MaterialModule} from "../../shared/material.module";
import {CommonModule} from "@angular/common";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {JwtService} from "../../services/jwt.service";
import {User} from "../../models/user";
import {EventService} from "../../services/event.service";
import {ConfirmDialogComponent} from "../../shared/confirm-dialog/confirm-dialog.component";
import {ResponseMessage} from "../../models/response-message";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NOT_FOUND} from "../../models/constants";

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [MaterialModule,CommonModule,ReactiveFormsModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventDetailsComponent implements OnInit {
  private event!: Event;
  eventForm!:FormGroup
  showAdminElements = false;

  constructor(private route: Router,private fb: FormBuilder,private jwtService:JwtService,private activatedRoute:ActivatedRoute,private eventService:EventService, private dialog: MatDialog,private _snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.showAdminElements = this.jwtService.isAdmin();
    // Mock data for the event
    // this.event = {
    //   id:'66aa862d0f51e06e4e66d2df',
    //   eventTime:'aa',
    //   packingTime:'bbb',
    //   name: 'Sample Event',
    //   location: 'Sample Location',
    //   date: new Date(2023,8,1),
    //   requiredUsers: 10,
    //   requiredDrivers: 5,
    //   assignedUsers: [      {id:'1',firstName:'Przemek',lastName:"Nowak",username:'Przemek',driver:true,availableDates:[],roles:[],phoneNumber:'123456',age:12,complaints:'mogę pracować od 8-16'},
    //     {id:'2',firstName:'Przemek',lastName:"Nowak",username:'Pelikan',driver:false,availableDates:[],roles:[],phoneNumber:'123456',age:12,complaints:'został zapisany na event'},],
    //   blackListedUsers: [      {id:'1',firstName:'Przemek',lastName:"Nowak",username:'Przemek',driver:true,availableDates:[],roles:[],phoneNumber:'123456',age:12,complaints:'mogę pracować od 8-16'},
    //     {id:'2',firstName:'Przemek',lastName:"Nowak",username:'Pelikan',driver:false,availableDates:[],roles:[],phoneNumber:'123456',age:12,complaints:'został zapisany na event'},],
    //   confirmedUsers: [      {id:'1',firstName:'Przemek',lastName:"Nowak",username:'Przemek',driver:true,availableDates:[],roles:[],phoneNumber:'123456',age:12,complaints:'mogę pracować od 8-16'},
    //     {id:'2',firstName:'Przemek',lastName:"Nowak",username:'Pelikan',driver:false,availableDates:[],roles:[],phoneNumber:'123456',age:12,complaints:'został zapisany na event'},]
    // };

    // Initialize the form
    this.eventForm = this.fb.group({
      id:[{value:'',disabled:true}],
      name: [{ value: '', disabled: true }],
      location: [{ value: '', disabled: true }],
      date: [{ value: '', disabled: true }],
      datePacking: [{ value: '', disabled: true }],
      requiredUsers: [{ value: '', disabled: true }],
      requiredDrivers: [{ value: '', disabled: true }],
      eventTime: [{ value: '', disabled: true }],
      packingTime: [{ value: '', disabled: true }],
      assignedUserIds: this.fb.array([{value:'',disabled:true}]),
      availablePackingUsers: this.fb.array([{value:'',disabled:true}]),
      blackListedUsers: this.fb.array([{value:'',disabled:true}]),
      confirmedUsers: this.fb.array([{value:'',disabled:true}])
    });
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadEvent(id);
      }
    });
  }

  loadEvent(id: string): void {
    this.eventService.getEventById(id).subscribe({ next:event => {
        const assignedUserIdsArray = this.fb.array(
          event.availableUsers?.map(user => this.fb.control({
            value: this.modifyUserDisplay(user),
            disabled: true
          })) || []
        );

        const availablePackingUsersArray = this.fb.array(
          event.availablePackingUsers?.map(user => this.fb.control({
            value: this.modifyUserDisplay(user),
            disabled: true
          })) || []
        );

        const blackListedUsersArray = this.fb.array(
          event.blackListedUsers?.map(user => this.fb.control({
            value: this.modifyUserDisplay(user),
            disabled: true
          })) || []
        );

        const confirmedUsersArray = this.fb.array(
          event.confirmedUsers?.map(user => this.fb.control({
            value: this.modifyUserDisplay(user),
            disabled: true
          })) || []
        );

        this.eventForm.patchValue({
          id: event.id,
          name: event.name,
          location: event.location,
          date: event.date,
          datePacking: event.datePacking,
          eventTime: event.eventTime,
          requiredUsers: event.requiredUsers,
          packingTime: event.packingTime,
          requiredDrivers: event.requiredDrivers,
        });
        if (assignedUserIdsArray?.value?.length > 0) {
          this.eventForm.setControl('assignedUserIds', assignedUserIdsArray);
        }
        if (availablePackingUsersArray?.value?.length > 0) {
          this.eventForm.setControl('availablePackingUsers', availablePackingUsersArray);
        }
        if (blackListedUsersArray?.value?.length > 0) {
          this.eventForm.setControl('blackListedUsers', blackListedUsersArray);
        }
        if (confirmedUsersArray?.value?.length > 0) {
          this.eventForm.setControl('confirmedUsers', confirmedUsersArray);
        }

        // this.loadAvailableUsers(this.eventForm.controls['date']?.value);
        // this.eventForm.controls['date']?.updateValueAndValidity();
        this.eventForm.markAllAsTouched();
        this.eventForm.markAsDirty();
      },
      error:()=>this.route.navigate([NOT_FOUND])
    });

  }
  modifyUserDisplay(user:User):string{
    return `${user.firstName} ${user.lastName} ${user.isDriver ? '\u{1F697}' : ''} ${user.phoneNumber ? user.phoneNumber : ""}`;
  }
  get assignedUserIds(): FormArray {
    return this.eventForm.get('assignedUserIds') as FormArray;
  }
  get availablePackingUsers(): FormArray {
    return this.eventForm.get('availablePackingUsers') as FormArray;
  }

  get blackListedUsers(): FormArray {
    return this.eventForm.get('blackListedUsers') as FormArray;
  }

  get confirmedUsers(): FormArray {
    return this.eventForm.get('confirmedUsers') as FormArray;
  }
  onEdit() {
    this.route.navigate(['/editEvent/'+this.eventForm.controls['id']?.value])
  }
  onDelete() {
    this.dialog.open(ConfirmDialogComponent,{
      width: '500px',
      data: {message : `Czy chcesz usunąć wydarzenie ${this.eventForm.controls['name']?.value} z dnia ${this.eventForm.controls['date']?.value}`,header: "Usunięcie Wydarzenia"}
    }).afterClosed().subscribe(closeData =>{
      if(closeData){
        this.eventService.deleteEvent(this.eventForm.controls['id']?.value).subscribe({
          next: (value:ResponseMessage) => {
            this.openSnackBar(`usunięto Użytkownika ${value.message}`, 'zamknij');
            this.route.navigate(["/eventList"])
          },
          error: () => this.openSnackBar("Coś poszło nie tak", 'zamknij')
        });
      }
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 3000,
      verticalPosition: 'top'
    });
  }
  getMissingPeopleCount() {
   return this.assignedUserIds?.controls?.length < this.eventForm.controls['requiredUsers']?.value ? `(Brakuje ${this.eventForm.controls['requiredUsers']?.value -this.assignedUserIds?.controls?.length} osób)` : '';
  }

}
