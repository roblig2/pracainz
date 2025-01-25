import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnInit} from '@angular/core';
import {ControlContainer, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material.module";
import {DataService} from "../../services/available-users.service";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {CommonModule, JsonPipe, NgForOf} from "@angular/common";
import {User} from "../../models/user";
import {Subject, takeUntil} from "rxjs";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ComplaintDialogComponent} from "../../components/complaint-dialog/complaint-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {MatChipGrid, MatChipInput, MatChipRow} from "@angular/material/chips";
import {AutocompleteComponent} from "../autocomplete/autocomplete.component";

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    NgForOf,
    NgxMatSelectSearchModule,
    JsonPipe,
    TranslateModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatChipInput,
    MatChipGrid,
    MatChipRow,
    AutocompleteComponent,

  ],
  viewProviders:[
    {
      provide:ControlContainer,
      useFactory: ()=>inject(ControlContainer,{skipSelf:true})
    }
  ],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiSelectComponent implements OnInit {
  @Input()
  label: string = "Wybierz padawana"
  parentContainer = inject(ControlContainer)

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  @Input()
  controlName: string = 'availableUsers';
  users: User[] | null = [];
  fullUsers: User[] = [];
  requiredDrivers = 2;
  requiredUsers = 4;
  driverMessage: string = '';
  userMessage: string = '';
  currentFruit = 'currentFruit';

  protected _onDestroy = new Subject<void>();

  constructor(private dataService: DataService, private translate: TranslateService, private dialog: MatDialog,
              private cdr: ChangeDetectorRef,) {
  }

  ngOnInit() {
    this.parentFormGroup.addControl(this.controlName, new FormControl({date: ['']}));
    this.parentFormGroup.addControl(this.currentFruit, new FormControl({currentFruit: ''}));


    // this.fullUsers = [
    //   {
    //     id: '1',
    //     firstName: 'Przemek',
    //     lastName: "Nowak",
    //     username: 'Przemek',
    //     driver: true,
    //     availableDates: [],
    //     roles: [],
    //     phoneNumber: '123456',
    //     age: 12,
    //     complaints: 'mogę pracować od 8-16'
    //   },
    //   {
    //     id: '2',
    //     firstName: 'Przemek',
    //     lastName: "Nowak",
    //     username: 'Pelikan',
    //     driver: false,
    //     availableDates: [],
    //     roles: [],
    //     phoneNumber: '123456',
    //     age: 12,
    //     complaints: 'został zapisany na event'
    //   },
    //   {
    //     id: '3',
    //     firstName: 'Przemek',
    //     lastName: "Nowak",
    //     username: 'Bartek',
    //     driver: false,
    //     availableDates: [],
    //     roles: [],
    //     phoneNumber: '123456',
    //     age: 12
    //   },
    //   {
    //     id: '4',
    //     firstName: 'Przemek',
    //     lastName: "Nowak",
    //     username: 'Dupa',
    //     driver: true,
    //     availableDates: [],
    //     roles: [],
    //     phoneNumber: '123456',
    //     age: 12
    //   },
    //   {
    //     id: '5',
    //     firstName: 'Przemek',
    //     lastName: "Nowak",
    //     username: 'Kacper',
    //     driver: false,
    //     availableDates: [],
    //     roles: [],
    //     phoneNumber: '123456',
    //     age: 12
    //   },
    //   {
    //     id: '6',
    //     firstName: 'Przemek',
    //     lastName: "Nowak",
    //     username: 'Tomczak',
    //     driver: true,
    //     availableDates: [],
    //     roles: [],
    //     phoneNumber: '123456',
    //     age: 12
    //   },
    //   {
    //     id: '7',
    //     firstName: 'Przemek',
    //     lastName: "Nowak",
    //     username: 'Gorski',
    //     driver: true,
    //     availableDates: [],
    //     roles: [],
    //     phoneNumber: '123456',
    //     age: 12
    //   },
    //   {
    //     id: '8',
    //     firstName: 'Przemek',
    //     lastName: "Nowak",
    //     username: 'maniek',
    //     driver: true,
    //     availableDates: [],
    //     roles: [],
    //     phoneNumber: '123456',
    //     age: 12
    //   },
    // ];
    this.users = this.fullUsers;
    this.users = JSON.parse(JSON.stringify(this.users));
    // this.parentFormGroup.get(this.controlName)?.valueChanges.subscribe(value => {
    //  if(value=nmiu)
    // });
    // todo
    // this.dataService.getData().subscribe(data => {
    //
    // });
    // set initial selection

    // listen for search field value changes
    this.parentFormGroup.get(this.controlName)?.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterSelection(this.parentFormGroup.get(this.controlName));
      });

    //todo
    // this.searchCtrl.valueChanges.subscribe(
    //   value => {
    //     this.customers$ = this._
    //   }
    // )
  }

  onSelectionChange() {

    const selectedUserIds = this.parentFormGroup.get(this.controlName)?.value;
    const selectedUsers = this.users?.filter(user => selectedUserIds.includes(user.id) && user.complaints);
    if (selectedUsers?.length) {
      const dialogRef = this.dialog.open(ComplaintDialogComponent, {
        width: '500px',
        data: {users: selectedUsers, formControl: this.parentFormGroup.get(this.controlName)}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (this.users) {
          // Zaktualizuj listę użytkowników w oparciu o wynik z dialogu
          const updatedUsers = this.users.map(user => {
            const updatedUser = selectedUsers.find(u => u.id === user.id);
            return updatedUser ? updatedUser : user;
          });

          this.users = updatedUsers.filter(user => selectedUserIds.includes(user.id) && !user.complaints);
          this.parentFormGroup.get(this.controlName)?.setValue(this.users.map(user => user.id));
        }
      });
    }

    this.validateSelection(selectedUserIds);
  }

  private validateSelection(selectedUserIds: string[]) {
    if (selectedUserIds && selectedUserIds.length > 0) {
      const selectedUsers = this.users?.filter(user => selectedUserIds.includes(user.id));
      const driverCount = selectedUsers?.filter(user => user.isDriver).length;
      const userCount = selectedUsers?.length;

      if (driverCount && driverCount < this.requiredDrivers) {
        //
        this.setDriverMessage();
      } else {
        this.clearMessage('driver');
      }

      if (userCount && userCount < this.requiredUsers) {
        this.setUserMessage()

      } else {
        this.clearMessage('user')
      }
    } else {
      this.clearMessage('driver')
      this.clearMessage('user')
    }
  }

  setDriverMessage() {
    this.translate.get('DRIVER_MESSAGE', {requiredDrivers: this.requiredDrivers})
      .subscribe((res: string) => {
        this.driverMessage = res;
      });
  }

  filterSelection(searchValue: any) {
    if (searchValue?.value instanceof Array) return;
    const filterValue = searchValue?.value ? searchValue?.value.toLowerCase() : null;
    if (filterValue || filterValue === '') {

      let users1 = this.users?.filter(user => user.userCredentials?.username.toLowerCase().includes(filterValue));

      this.users = users1 && users1.length > 0 ? users1 : null;
    } else {

      this.users = this.fullUsers;
    }
  }

  private clearMessage(driver: string) {
    if (driver === 'driver') {
      this.driverMessage = '';
    } else {
      this.userMessage = '';
    }
  }

  private setUserMessage() {
    this.translate.get('USER_MESSAGE', {requiredUsers: this.requiredUsers})
      .subscribe((res: string) => {
        this.userMessage = res;
      });
  }
}
