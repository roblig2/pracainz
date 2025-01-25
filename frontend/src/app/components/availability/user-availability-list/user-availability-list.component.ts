import {ChangeDetectionStrategy, Component, OnDestroy, signal, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TableComponent} from "../../../shared/table/table.component";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Pageable} from "../../../models/Pageable";
import {User} from "../../../models/user";
import {Sort} from "@angular/material/sort";
import {Column} from "../../../models/column";
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MaterialModule} from "../../../shared/material.module";
import {SharedModule} from "../../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "../../../header/header.component";
import {TranslateModule} from "@ngx-translate/core";
import {Availability} from "../model/Availability";
import {ErrorDialogComponent} from "../../../shared/error-dialog/error-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-availability-list',
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
  templateUrl: './user-availability-list.component.html',
  styleUrl: './user-availability-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAvailabilityListComponent{
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  events = signal<Pageable<Availability>>({content:[],totalElements:0,pageable:{size:0,totalPages:0,number:0}});
  pageSize = 10;
  currentPage = 0;
  sort:Sort = {active:'date',direction:"asc"}
  displayedColumns: string[] = ['name', 'date', 'requiredDrivers','assignedUserIds','requiredUsers'];
  filterForm!: FormGroup;
  totalElements = signal<number>(0);
  url = '/eventDetails/'
  tableColumns: Array<Column> = [
    { columnDef: 'date', header: 'Data', cell: (element: Record<string, any>) => `${element['date']}`},
    { columnDef: 'remark', header: 'Uwagi', cell: (element: Record<string, any>) => `${element['remark']}`},
    { columnDef: 'actions', header: 'Akcje', cell: (element: Record<string, any>) => '' }  // Placeholder
  ];
  tableData: Array<Availability> = [];
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.filterForm = this.fb.group({
    });
  }

  ngOnInit() {
  }



  loadAvailabilityPage() {

    const filters = this.filterForm.value;
    filters.sortOrder = this.sort.direction ?this.sort.direction.toUpperCase() : "ASC";
    filters.sortBy = 'availableDates.' + this.sort.active;
    // this.events$ = this.eventService.getAllEvents(this.paginator?.pageIndex ? this.paginator.pageIndex : 0, this.paginator?.pageSize ? this.paginator.pageSize : 50, filters);
    this.userService.getAvailability(this.currentPage ? this.currentPage : 0, this.pageSize ? this.pageSize : 20, filters)
      .subscribe(value => {
        this.totalElements.set(value.totalElements);
        this.events.set(value);
        this.tableData = value.content;
      });


  }


  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadAvailabilityPage();
  }
  search() {
    this.currentPage = 0;
    this.loadAvailabilityPage();
  }

  onSortChange(event: Sort) {
    this.sort = event
    this.loadAvailabilityPage();
  }

  handleAction(event: { action: string; row: { date: string, remark:string } }) {
    this.dialog.open(ConfirmDialogComponent,{
      width: '500px',
      data: {date : event.row?.date,header: "Rezygnacja z Dostępności"}
    }).afterClosed().subscribe(closeData =>{
      if(closeData){
        this.userService.deleteAvailability(event?.row?.date).subscribe({
          next: value => {
            this.openSnackBar('usunięto datę', 'zamknij');
            this.loadAvailabilityPage()
          },
          error:err => this.openSnackBar("Coś poszło nie tak",'zamknij')
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
}

