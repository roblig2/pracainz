import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnChanges, Output} from '@angular/core';
import {filter, Observable, of, startWith} from "rxjs";
import {User} from "../../models/user";
import {map} from "rxjs/operators";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../material.module";
import {ControlContainer, FormControl, FormGroup, FormsModule} from "@angular/forms";
import {SharedModule} from "../shared.module";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {ComplaintDialogComponent} from "../../components/complaint-dialog/complaint-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,

  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteComponent implements OnChanges{

  @Input()
  label="Dodaj eventowców";
  @Input()
  fullUser: User[] = [];
  @Input()
  controlName: string = 'availableUsers';
  user$: Observable<User[]> =new Observable();
  @Input()
  selectedUsers: User[] = [];
  @Output()
  availableSelectedUsers = new EventEmitter();
  filterUser: string = '';
  searchCtrl = new FormControl('');
  parentContainer = inject(ControlContainer)

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }
  constructor(private dialog: MatDialog) {
  }
  ngOnInit(){
    this.parentFormGroup.addControl(this.controlName, new FormControl(''));
    this.searchUsers();
  }

  private searchUsers() {
    this._filterUser(this.filterUser)

    this.user$ = of(this.fullUser);
    this.searchCtrl.valueChanges
      .pipe(
        map(value => typeof value === 'object' ? '' : value)
      )
      .subscribe(value => {
        if (value) {
          this._filterUser(value)
        }
      });
  }

  ngOnChanges() {
    this.searchUsers();

  }


  displayUserName(user: User){

    if(user?.firstName !=null){

      return user.firstName + " " + user.lastName + " " + (user.isDriver ? "\u{1F697}" : "");
    }
    return '';
  }


  private _filterUser(input: string) {
    this.user$ = of(this.fullUser).pipe(map(users => users.filter(user =>
      input != '' ? this.displayUserName(user).toLowerCase().includes(input.toLowerCase()) : true
    )));

  }

  onOptionSelect(event: MatAutocompleteSelectedEvent) {
    this.searchCtrl.setValue("");
    const user: User = event.option.value;
    let complaintData: { user: string, message: string,header:string} = {user: `${user.firstName} ${user.lastName}`, message: "" , header: "Użytkownicy z uwagami"};
    if (user.events && user.events?.length > 0) {
      complaintData.header = "Użytkownicy zapisani na inne wydarzenie"
      if(user.events[0]?.isEvent){
        complaintData.message = `jest zapisany dnia ${user.events[0]?.date ?? user.events[0]?.date} na wydarzenie o nazwie ${user.events[0]?.name}`
      }else{
        complaintData.message = `jest zapisany dnia ${user.events[0]?.date ?? user.events[0]?.date} na pakowanie auta do wydarzenia o nazwie ${user.events[0]?.name}`
      }
      this.openComplaintDialog(complaintData, user);
    }

    else if (user.availableDates.length>0 && user.availableDates[0].remark && user.availableDates[0].remark != "" ) {
      complaintData.message = user.availableDates[0].remark;
      this.openComplaintDialog(complaintData, user);
    } else {
      this.updateUserList(user);
      this.searchCtrl.setValue('');
      this.availableSelectedUsers.emit(this.selectedUsers);
    }
  }

  private openComplaintDialog(complaintData: { user: string; message: string; header: string }, user: User) {
    const dialogRef = this.dialog.open(ComplaintDialogComponent, {
      width: '500px',
      data: complaintData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.selectedUsers.findIndex(c => c.id === user.id) < 0) {
          this.selectedUsers.push(user);
        }
        this.searchCtrl.setValue('');
        this.updateUserList(user);
        this.availableSelectedUsers.emit(this.selectedUsers)
      } else if(result === false) {
        this.user$ = of(this.fullUser.filter(usr => usr.id !== user.id))
        this.searchCtrl.setValue('');
        this.availableSelectedUsers.emit(this.selectedUsers)
      }
    });
  }

  updateUserList(user: User) {
    if (!this.selectedUsers.some(u => u.id === user.id)) {
      this.selectedUsers.push(user);
      this.parentFormGroup.get(this.controlName)?.setValue(this.selectedUsers.map(u => u.id));
    }
  }
  removeUser(user: User) {
    this.selectedUsers = [...this.selectedUsers.filter(usr => usr.id !==  user.id)];
  }

  checkSelectedUser(user: User) {
    return this.selectedUsers.findIndex(usr=>usr.id ===user.id) > -1;
  }

}
