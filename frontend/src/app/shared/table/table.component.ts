import {AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared.module";
import {MatTableDataSource} from "@angular/material/table";
import {Column} from "../../models/column";
import {RouterLink} from "@angular/router";
import {Pageable} from "../../models/Pageable";
import {PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,

  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T> implements OnInit,AfterViewInit{
  @Input() isUrlActive = true;
  @Input() showActions = true;
  @Input() singleAction = false;
  @Input() url:string ="";
  @Input() tableColumns: Array<Column> = [];

  @Input() tableData: Pageable<T> = {content:[],totalElements:0,pageable:{size:0,totalPages:0,number:0}};

  @Output() pageChange = new EventEmitter;
  @Output() sortChange = new EventEmitter;
  @Output() actionChange = new EventEmitter<{action: string, row: any}>();
  displayedColumns: Array<string> = [];
  dataSource: MatTableDataSource<T> = new MatTableDataSource();

  constructor() {}

  ngOnInit(): void {
    this.displayedColumns = this.tableColumns.map((c) => c.columnDef);
    this.dataSource = new MatTableDataSource(this.tableData.content);
  }
  ngOnChanges(){
      this.displayedColumns = this.tableColumns.map((c) => c.columnDef);
      this.dataSource = new MatTableDataSource(this.tableData.content);

  }

  ngAfterViewInit(): void {
  }

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }

  announceSortChange(event: Sort) {
    this.sortChange.emit(event);
  }

  emitAction(action: string, row:any) {
    this.actionChange.emit({action, row});
  }

}
