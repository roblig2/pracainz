import {ChangeDetectionStrategy, Component, signal, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Pageable} from "../../models/Pageable";
import {Event} from "../../models/event";
import {Sort} from "@angular/material/sort";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Column} from "../../models/column";
import {EventService} from "../../services/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MaterialModule} from "../../shared/material.module";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "../../header/header.component";
import {TranslateModule} from "@ngx-translate/core";
import {TableComponent} from "../../shared/table/table.component";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../shared/error-dialog/error-dialog.component";

@Component({
  selector: 'app-user-list',
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
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  events = signal<Pageable<User>>({content:[],totalElements:0,pageable:{size:0,totalPages:0,number:0}});
  pageSize = 5;
  currentPage = 0;
  sort:Sort = {active:'lastName',direction:"asc"}
  displayedColumns: string[] = ['name', 'date', 'requiredDrivers','assignedUserIds','requiredUsers'];
  filterForm!: FormGroup;
  totalElements = signal<number>(0);
  url = '/userDetails/'
  tableColumns: Array<Column> = [
    { columnDef: 'firstName', header: 'Imię', cell: (element: Record<string, any>) => `${element['firstName']}`},
    { columnDef: 'lastName', header: 'Nazwisko', cell: (element: Record<string, any>) => `${element['lastName']}`},
    { columnDef: 'username', header: 'Email', cell: (element: Record<string, any>) => `${element['username']}`},
    { columnDef: 'phoneNumber', header: 'Numer telefonu', cell: (element: Record<string, any>) => `${element['phoneNumber']}`},
    { columnDef: 'driver', header: 'Czy jest kierowcą', cell: (element: Record<string, any>) => this.formatIsDriver(element['isDriver'])},
  ];
  tableData: Array<User> = [];
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.filterForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      username: [''],
      isDriver: [false],
    });
  }

  ngOnInit() {
  }
  formatIsDriver(isDriver: boolean): string {
    return isDriver ? 'Tak' : 'Nie';
  }


  loadUserPage() {

    const filters = this.filterForm.value;
    filters.sortOrder = this.sort.direction.toUpperCase();
    filters.sortBy = this.sort.active;
    // this.events$ = this.eventService.getAllEvents(this.paginator?.pageIndex ? this.paginator.pageIndex : 0, this.paginator?.pageSize ? this.paginator.pageSize : 50, filters);
    this.userService.getUsers(this.currentPage ? this.currentPage : 0, this.pageSize ? this.pageSize : 20, filters)
      .subscribe(value => {
        this.totalElements.set(value.totalElements);
        this.events.set(value);
        this.tableData = value.content;
      });


  }


  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUserPage();
  }
  search() {
    this.currentPage = 0;
    this.loadUserPage();
  }

  onSortChange(event: Sort) {
    this.sort = event
    this.loadUserPage();
  }


}
