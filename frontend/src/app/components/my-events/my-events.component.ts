import {ChangeDetectionStrategy, Component, computed, signal, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Pageable} from "../../models/Pageable";
import {Event} from "../../models/event";
import {Sort} from "@angular/material/sort";
import {Column} from "../../models/column";
import {EventService} from "../../services/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {MaterialModule} from "../../shared/material.module";
import {HeaderComponent} from "../../header/header.component";
import {TableComponent} from "../../shared/table/table.component";
import {ErrorDialogComponent} from "../../shared/error-dialog/error-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../shared/confirm-dialog/confirm-dialog.component";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {map} from "rxjs/operators";
import {lastValueFrom, Observable, of} from "rxjs";
import {User} from "../../models/user";

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
    HeaderComponent,
    TranslateModule,
    TableComponent,
    HeaderComponent
  ],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyEventsComponent {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  events = signal<Pageable<Event>>({content: [],totalElements:0 ,pageable: {size: 0, totalPages: 0, number: 0}});
  user = signal<User | null>(null);

  pageSize = 10;
  currentPage = 0;
  sort: Sort = {active: 'date', direction: "asc"}
  // displayedColumns: string[] = ['name', 'date', 'requiredDrivers','assignedUserIds','requiredUsers'];
  filterForm!: FormGroup;
  totalElements = signal<number>(0);
  url = '/eventDetails/'
  tableColumns: Array<Column> = [
    {columnDef: 'name', header: 'Nazwa Eventu', cell: (element: Record<string, any>) => `${element['name']}`},
    {columnDef: 'location', header: 'Miejsce Eventu', cell: (element: Record<string, any>) => `${element['location']}`},
    {columnDef: 'date', header: 'Data', cell: (element: Record<string, any>) => `${element['date']}`},
    {
      columnDef: 'availableUsers',
      header: 'Zadeklarowany Personel',
      cell: (element: Record<string, any>) => this.bookedPeople(element)
    },
    {
      columnDef: 'requiredDrivers',
      header: 'Ilość kierowców',
      cell: (element: Record<string, any>) => `${element['requiredDrivers']}`
    },
    {
      columnDef: 'requiredUsers',
      header: 'Ilość obsługi',
      cell: (element: Record<string, any>) => `${element['requiredUsers']}`
    },
    {
      columnDef: 'actions',
      header: 'Akcje',
      cell: (element: Record<string, any>) => '',
      isAcceptActive: (element: Event) => this.isAcceptActive(element)
    }
  ];
  tableData: Array<Event> = [];

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {

    this.filterForm = this.fb.group({
      name: [''],
      location: [''],
      // calendarFrom: [''],
      // calendarTo: [''],
      sortBy: [''],
      sortOrder: ['']
    });
  }

  ngOnInit() {
    this.userService.getSelf().subscribe(user => this.user.set(user));
  }

  isAcceptActive(event:Event) {
    const user = this.user();
    if (user && event?.confirmedUsers?.map(event=>event.id==user.id)) {
      return false;
    }

    const eventDateObj = new Date(event ? event.date : new Date(10));
    const currentDate = new Date();
    const timeDiff = eventDateObj.getTime() - currentDate.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return dayDiff <= 3;
  }



  loadEventsPage() {

    for (let controlsKey in this.filterForm.controls) {
      if (this.filterForm.controls[controlsKey]?.value == "") {
        this.filterForm.controls[controlsKey].patchValue(null);
      }
    }
    const filters = this.filterForm.value;
    filters.sortOrder = this.sort.direction.toUpperCase();
    filters.sortBy = this.sort.active;
    // this.events$ = this.eventService.getAllEvents(this.paginator?.pageIndex ? this.paginator.pageIndex : 0, this.paginator?.pageSize ? this.paginator.pageSize : 50, filters);
    this.eventService.getUserEvents(this.currentPage ? this.currentPage : 0, this.pageSize ? this.pageSize : 20, filters)
      .subscribe(value => {
        this.totalElements.set(value.totalElements);
        this.events.set(value);
        this.tableData = value.content;
      });


  }


  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadEventsPage();
  }

  search() {
    this.currentPage = 0;
    this.loadEventsPage();
  }

  onSortChange(event: Sort) {
    this.sort = event
    this.loadEventsPage();
  }

  private bookedPeople(element: Record<string, any>) {
    if (this.isntEnoughPeople(element)) {
      return `${element['availableUsers']?.length != null ? element['availableUsers']?.length : 0} < ${element['requiredUsers']}`;
    } else {
      return `${element['availableUsers']?.length != null ? element['availableUsers']?.length : 0}`;
    }
  }

  private isntEnoughPeople(element: any) {
    // return false;
    let assignedUsers: number = element['availableUsers']?.length != null ? element['availableUsers']?.length : 0;
    let requiredUsers = +element['requiredUsers'];

    return assignedUsers < requiredUsers
  }

  handleAction(event: { action: string; row: Event }) {
    if (event.action == 'accept') {
      this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          date: event.row?.date,
          message: `Czy potwierdzasz udział w Evencie ${event.row.name} dnia ${event.row.date}`,
          header: "Potwierdzenie Obecności"
        }
      }).afterClosed().subscribe(closeData => {
        if (closeData) {
          this.eventService.acceptEvent(event?.row?.id).subscribe({
            next: value => {
              this.openSnackBar('usunięto datę', 'zamknij');
              this.loadEventsPage()
            },
            error: err => this.openSnackBar("Coś poszło nie tak", 'zamknij')
          });
        }
      });
    } else {
      this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          date: event.row?.date,
          header: "Rezygnacja z Dostępności"}
      }).afterClosed().subscribe(closeData => {
        if (closeData) {
          this.userService.deleteAvailability(event?.row?.date.toString()).subscribe({
            next: value => {
              this.openSnackBar('usunięto datę', 'zamknij');
              this.loadEventsPage()
            },
            error: err => this.openSnackBar("Coś poszło nie tak", 'zamknij')
          });
        }
      });
    }

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}

