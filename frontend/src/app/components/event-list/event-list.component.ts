import {ChangeDetectionStrategy, Component, OnInit, signal, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {EventService} from "../../services/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MaterialModule} from "../../shared/material.module";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";
import {Pageable} from "../../models/Pageable";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";
import {TranslateModule} from "@ngx-translate/core";
import {Event} from '../../models/event';
import {TableComponent} from "../../shared/table/table.component";
import {Column} from "../../models/column";
import {HeaderComponent} from "../../header/header.component";


@Component({
  selector: 'app-event-list',
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
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  events = signal<Pageable<Event>>({content:[],totalElements:0,pageable:{size:0,totalPages:0,number:0}});
  pageSize = 10;
  currentPage = 0;
  sort:Sort = {active:'date',direction:"asc"}
  // displayedColumns: string[] = ['name', 'date', 'requiredDrivers','assignedUserIds','requiredUsers'];
  filterForm!: FormGroup;
  totalElements = signal<number>(0);
  url = '/eventDetails/'
  tableColumns: Array<Column> = [
    { columnDef: 'name', header: 'Nazwa Eventu', cell: (element: Record<string, any>) => `${element['name']}`},
    { columnDef: 'location', header: 'Miejsce Eventu', cell: (element: Record<string, any>) => `${element['location']}`},
    { columnDef: 'date', header: 'Data', cell: (element: Record<string, any>) => `${element['date']}` },
    { columnDef: 'bookedPeople', header: 'Zadeklarowany Personel', cell: (element: Record<string, any>) => this.bookedPeople(element)},
    { columnDef: 'requiredDrivers', header: 'Ilość kierowców', cell: (element: Record<string, any>) => `${element['requiredDrivers']}`},
    { columnDef: 'requiredUsers', header: 'Ilość obsługi', cell: (element: Record<string, any>) => `${element['requiredUsers']}` },
    // { columnDef: 'actions', header: 'Akcje', cell: (element: Record<string, any>) => '' }  // Placeholder
  ];
  tableData: Array<Event> = [];
  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.filterForm = this.fb.group({
      name: [''],
      location: [''],
      // calendarFrom: [''],
      // calendarTo: [''],
      isMissingPeople: [false],
      sortBy: [''],
      sortOrder: ['']
    });
  }

  ngOnInit() {
  }



  loadEventsPage() {

    if(this.filterForm.controls['isMissingPeople']?.value === false){
      this.filterForm.controls['isMissingPeople']?.patchValue(null);
    }
    const filters = this.filterForm.value;
    filters.sortOrder = this.sort.direction.toUpperCase();
    filters.sortBy = this.sort.active;
    // this.events$ = this.eventService.getAllEvents(this.paginator?.pageIndex ? this.paginator.pageIndex : 0, this.paginator?.pageSize ? this.paginator.pageSize : 50, filters);
    this.eventService.getEvents(this.currentPage ? this.currentPage : 0, this.pageSize ? this.pageSize : 20, filters)
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
    }else{
      return `${element['availableUsers']?.length != null ? element['availableUsers']?.length : 0}`;
    }
  }

  private isntEnoughPeople(element: any) {
    // return false;
    let assignedUsers:number = element['availableUsers']?.length != null ? element['availableUsers']?.length : 0;
    let requiredUsers = +element['requiredUsers'];

    return assignedUsers < requiredUsers
  }
}
